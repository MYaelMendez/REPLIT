/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef } from 'react';
import { RobotOS } from './components/RobotOS';

export const App: React.FC = () => {
    return (
        <div className="h-full w-full bg-[#020204] text-[#f0f0ff] font-mono overflow-hidden relative">
            <RobotOS />
        </div>
    );
};
