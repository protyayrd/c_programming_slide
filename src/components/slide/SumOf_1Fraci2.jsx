import React from 'react';
import { Code, Layers, Repeat, RefreshCw } from 'lucide-react';
import LoopExampleTemplate from '../shared/LoopExampleTemplate';

const SumOf_1Fraci2 = () => {
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
#include <math.h>
int main() {
    float sum = 0;
    int i;
    for (i = 1; i <= 5; i++) {
        sum = sum + 1.0 / pow(i, 2);
    }
    printf("Sum = %f\\n", sum);
    return 0;
}`,
            color: 'bg-blue-500'
        },
        while: {
            title: 'While Loop',
            icon: RefreshCw,
            code: `#include <stdio.h>
#include <math.h>
int main() {
    float sum = 0;
    int i = 1;
    while (i <= 5) {
        sum = sum + 1.0 / pow(i, 2);
        i++;
    }
    printf("Sum = %f\\n", sum);
    return 0;
}`,
            color: 'bg-green-500'
        },
        dowhile: {
            title: 'Do-While Loop',
            icon: Code,
            code: `#include <stdio.h>
#include <math.h>
int main() {
    float sum = 0;
    int i = 1;
    do {
        sum = sum + 1.0 / pow(i, 2);
        i++;
    } while (i <= 5);
    printf("Sum = %f\\n", sum);
    return 0;
}`,
            color: 'bg-purple-500'
        }
    };

    return <LoopExampleTemplate loopTypes={loopTypes} />;
};

export default SumOf_1Fraci2;