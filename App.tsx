/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef } from 'react';
import { Opensourceware } from './components/Opensourceware';

export const App: React.FC = () => {
    return (
        <div className="min-h-full w-full bg-[#10110f] text-[#f4f0e7] font-sans relative">
            <Opensourceware />
        </div>
    );
};
