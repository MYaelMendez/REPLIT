/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ATSRequest {
    domain: string;
    path: string;
    intent: string;
    parameters: Record<string, any>;
    sovereignId?: string;
    sessionId?: string;
}

export interface ATSResponse {
    success: boolean;
    content: any;
    contentType: string;
    executionTime: number;
    metadata: Record<string, any>;
}

export type ATSHandler = (request: ATSRequest) => Promise<any>;
export type ATSMiddleware = (request: ATSRequest) => Promise<ATSRequest>;

export class ATSProtocolHandler {
    private domainHandlers: Map<string, ATSHandler> = new Map();
    private middleware: ATSMiddleware[] = [];
    private sovereignDomains = [
        "yael.com",
        "commandprompt.ai",
        "privateclient.ai",
        "teologia.ai",
        "daollc.ai",
        "neuromitosis.com"
    ];

    public registerDomainHandler(domain: string, handler: ATSHandler) {
        this.domainHandlers.set(domain, handler);
    }

    public addMiddleware(middleware: ATSMiddleware) {
        this.middleware.push(middleware);
    }

    public parseATSURI(atsUri: string): ATSRequest {
        if (!atsUri.startsWith("ats://")) {
            throw new Error("Invalid ATS URI: must start with ats://");
        }

        const uriWithoutProtocol = atsUri.slice(6);
        const [domain, ...pathParts] = uriWithoutProtocol.split("/");
        const path = "/" + pathParts.join("/");
        
        // Extract intent and parameters from path
        const [intentPath, queryString] = path.split("?");
        const intent = intentPath.slice(1) || "default";
        
        const parameters: Record<string, any> = {};
        if (queryString) {
            const searchParams = new URLSearchParams(queryString);
            searchParams.forEach((value, key) => {
                parameters[key] = value;
            });
        }

        return {
            domain,
            path,
            intent,
            parameters
        };
    }

    public async processRequest(atsRequest: ATSRequest): Promise<ATSResponse> {
        const startTime = performance.now();
        
        try {
            let request = atsRequest;
            for (const m of this.middleware) {
                request = await m(request);
            }

            const handler = this.domainHandlers.get(request.domain);
            if (!handler) {
                throw new Error(`No handler registered for domain: ${request.domain}`);
            }

            const content = await handler(request);
            const executionTime = performance.now() - startTime;

            return {
                success: true,
                content,
                contentType: "application/json",
                executionTime,
                metadata: {
                    domain: request.domain,
                    intent: request.intent,
                    sovereignDomain: this.sovereignDomains.includes(request.domain)
                }
            };
        } catch (e: any) {
            const executionTime = performance.now() - startTime;
            return {
                success: false,
                content: { error: e.message },
                contentType: "application/json",
                executionTime,
                metadata: { error: true }
            };
        }
    }
}
