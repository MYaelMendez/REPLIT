/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TableValue = string | number | boolean | null;
export type TableRow = Record<string, TableValue>;
export type Table = TableRow[];

export interface MechTransaction {
    table: string;
    data: Table;
    op: 'set' | 'update' | 'append';
}

export interface MechBlock {
    id: string;
    inputs: string[];
    outputs: string[];
    fn: (core: MechCore) => void;
}

export class MechCore {
    private tables: Map<string, Table> = new Map();
    private blocks: MechBlock[] = [];
    private listeners: Set<(tableName: string) => void> = new Set();
    private isRunning: boolean = false;

    constructor() {
        this.setTable('system/core', [
            { property: 'status', value: 'active' },
            { property: 'version', value: '0.2.0-æ' },
            { property: 'identity', value: 'ROBOT_OS_MCP64' }
        ]);
    }

    public getTable(name: string): Table {
        return this.tables.get(name) || [];
    }

    public setTable(name: string, data: Table) {
        this.tables.set(name, data);
        this.notify(name);
    }

    public commit(transactions: MechTransaction[]) {
        for (const tx of transactions) {
            if (tx.op === 'set') {
                this.tables.set(tx.table, tx.data);
            } else if (tx.op === 'append') {
                const current = this.getTable(tx.table);
                this.tables.set(tx.table, [...current, ...tx.data]);
            }
            this.notify(tx.table);
        }
    }

    public addBlock(block: MechBlock) {
        this.blocks.push(block);
        this.runBlock(block);
    }

    public subscribe(callback: (tableName: string) => void) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    private notify(tableName: string) {
        this.listeners.forEach(l => l(tableName));
        this.triggerDependentBlocks(tableName);
    }

    private triggerDependentBlocks(tableName: string) {
        if (this.isRunning) return;
        this.isRunning = true;
        
        const toRun = this.blocks.filter(b => b.inputs.includes(tableName));
        for (const block of toRun) {
            this.runBlock(block);
        }
        
        this.isRunning = false;
    }

    private runBlock(block: MechBlock) {
        try {
            block.fn(this);
            block.outputs.forEach(out => this.notify(out));
        } catch (e) {
            console.error(`Mech Block Error [${block.id}]:`, e);
        }
    }

    /**
     * Advanced Mech Syntax Parser (Subset)
     * #table = [x: 1, y: 2]
     * #output = #input.x + 1
     * #sum = sum(#input.x)
     */
    public parseAndRun(code: string) {
        const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));
        
        for (const line of lines) {
            // Table Definition: #name = [col1: val1, col2: val2]
            const tableDefMatch = line.match(/^#([\w/]+)\s*=\s*\[(.*)\]$/);
            if (tableDefMatch) {
                const name = tableDefMatch[1];
                const content = tableDefMatch[2];
                const pairs = content.split(',').map(p => p.trim());
                const row: TableRow = {};
                pairs.forEach(p => {
                    const [k, v] = p.split(':').map(s => s.trim());
                    row[k] = this.parseValue(v);
                });
                this.setTable(name, [row]);
                continue;
            }

            // Simple Transformation (Reactive Block)
            // #out = #in.col + val
            const transformMatch = line.match(/^#([\w/]+)\s*=\s*#([\w/]+)\.([\w]+)\s*([\+\-\*\/])\s*(.*)$/);
            if (transformMatch) {
                const outName = transformMatch[1];
                const inName = transformMatch[2];
                const col = transformMatch[3];
                const op = transformMatch[4];
                const valStr = transformMatch[5].trim();

                this.addBlock({
                    id: `transform-${Math.random().toString(36).substr(2, 9)}`,
                    inputs: [inName],
                    outputs: [outName],
                    fn: (core) => {
                        const inTable = core.getTable(inName);
                        const operand = this.parseValue(valStr);
                        
                        const newTable = inTable.map(row => {
                            const currentVal = row[col];
                            if (typeof currentVal !== 'number') return row;
                            
                            let result = currentVal;
                            const numOp = typeof operand === 'number' ? operand : 0;
                            
                            if (op === '+') result = currentVal + numOp;
                            if (op === '-') result = currentVal - numOp;
                            if (op === '*') result = currentVal * numOp;
                            if (op === '/') result = currentVal / (numOp || 1);
                            
                            return { ...row, [col]: result };
                        });
                        
                        core.setTable(outName, newTable);
                    }
                });
                continue;
            }
        }
    }

    private parseValue(v: string): TableValue {
        v = v.trim();
        if (v === 'true') return true;
        if (v === 'false') return false;
        if (v === 'null') return null;
        if (!isNaN(Number(v))) return Number(v);
        // Remove quotes if present
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
            return v.slice(1, -1);
        }
        return v;
    }
}

export const mech = new MechCore();
