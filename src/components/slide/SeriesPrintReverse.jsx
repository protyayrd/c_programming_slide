import React from 'react';
import { Code, Layers, Repeat, RefreshCw } from 'lucide-react';
import LoopExampleTemplate from '../shared/LoopExampleTemplate';

const SeriesPrintReverse = () => {
    const loopTypes = {
        fordetail: {
            title: 'Elements',
            icon: Layers,
            components: [
                { label: 'Initialization', description: 'Set starting value' },
                { label: 'Condition', description: 'Define loop continuation' },
                { label: 'Update', description: 'Modify loop variable' },
                {
                    label: 'Body',
                    description: 'Code to execute each iteration',
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
    for (int i = 100; i >= 0; i = i - 10) {
        printf("%d ", i);
    }
    return 0;
}`,
            color: 'bg-blue-500'
        },
        while: {
            title: 'While Loop',
            icon: RefreshCw,
            code: `#include <stdio.h>
int main() {
    int i = 100;
    while (i >= 0) {
        printf("%d ", i);
        i = i - 10;
    }
    return 0;
}`,
            color: 'bg-green-500'
        },
        dowhile: {
            title: 'Do-While Loop',
            icon: Code,
            code: `#include <stdio.h>
int main() {
    int i = 100;
    do {
        printf("%d ", i);
        i = i - 10;
    } while (i >= 0);
    return 0;
}`,
            color: 'bg-purple-500'
        }
    };

    return <LoopExampleTemplate loopTypes={loopTypes} />;
};

export default SeriesPrintReverse;