import React from 'react';
import { Code, Layers, Repeat, RefreshCw } from 'lucide-react';
import LoopExampleTemplate from '../shared/LoopExampleTemplate';

const SumOf_iXi = () => {
    const loopTypes = {
        fordetail: {
            title: 'Elements',
            icon: Layers,
            components: [
                { label: 'Initialization', description: 'Set starting values' },
                { label: 'Condition', description: 'Define loop continuation' },
                { label: 'Update', description: 'Modify loop variables' },
                {
                    label: 'Accumulation',
                    description: 'Add current value to running total',
                    extraHeight: true
                }
            ],
            color: 'bg-blue-600'
        },
        for: {
            title: 'For Loop',
            icon: Repeat,
            code: `#include <stdio.h>
int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum = sum + i * i;
    }
    printf("Sum: %d", sum);
    return 0;
}`,
            color: 'bg-blue-500'
        },
        while: {
            title: 'While Loop',
            icon: RefreshCw,
            code: `#include <stdio.h>
int main() {
    int sum = 0;
    int i = 1;
    while (i <= 5) {
        sum = sum + i * i;
        i++;
    }
    printf("Sum: %d", sum);
    return 0;
}`,
            color: 'bg-green-500'
        },
        dowhile: {
            title: 'Do-While Loop',
            icon: Code,
            code: `#include <stdio.h>
int main() {
    int sum = 0;
    int i = 1;
    do {
        sum = sum + i * i;
        i++;
    } while (i <= 5);
    printf("Sum: %d", sum);
    return 0;
}`,
            color: 'bg-purple-500'
        }
    };

    return <LoopExampleTemplate loopTypes={loopTypes} />;
};

export default SumOf_iXi;