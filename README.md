# C Programming Lecture: Loops

## Overview

This lecture covers the fundamental concepts of loops in C programming. It includes various types of loops, their structures, and practical examples to help students understand how to implement loops effectively in their programs.

## Table of Contents

1. [Cover Page](#cover-page)
2. [Loops Intro](#loops-intro)
3. [Marathon Race Animation](#marathon-race-animation)
4. [Loop Elements](#loop-elements)
5. [Loop Flow](#loop-flow)
6. [Types of Loops](#types-of-loops)
7. [For Loop Details](#for-loop-details)
8. [For Loop Visualizer](#for-loop-visualizer)
9. [While Loop Details](#while-loop-details)
10. [While Loop Visualizer](#while-loop-visualizer)
11. [Do-While Loop Details](#do-while-loop-details)
12. [Do-While Loop Visualizer](#do-while-loop-visualizer)
13. ['Bondipathshala' word টি 5 বার প্রিন্ট করো।](#bondipathshala-word-টি-5-বার-প্রিন্ট-করো)
14. [1 থেকে 5 পর্যন্ত সংখ্যা গুলো প্রিন্ট করো।](#1-থেকে-5-পর্যন্ত-সংখ্যা-গুলো-প্রিন্ট-করো)
15. [1 থেকে 10 পর্যন্ত বিজোড় সংখ্যা গুলো প্রিন্ট করো।](#1-থেকে-10-পর্যন্ত-বিজোড়-সংখ্যা-গুলো-প্রিন্ট-করো)
16. [1 থেকে 10 পর্যন্ত জোড় সংখ্যা গুলো প্রিন্ট করো।](#1-থেকে-10-পর্যন্ত-জোড়-সংখ্যা-গুলো-প্রিন্ট-করো)
17. [1, 4, 7, ..., 25 সিরিজটি প্রিন্ট করো।](#1-4-7-25-সিরিজটি-প্রিন্ট-করো)
18. [100, 90, 80, ..., 0 সিরিজটি প্রিন্ট করো।](#100-90-80-0-সিরিজটি-প্রিন্ট-করো)
19. [1 থেকে 5 পর্যন্ত সংখ্যা গুলোর যোগফল নির্নয় করো।](#1-থেকে-5-পর্যন্ত-সংখ্যা-গুলোর-যোগফল-নির্নয়-করো)
20. [১ থেকে ৫ পর্যন্ত সংখ্যা গুলোর যোগফল নির্নয় করো।](#১-থেকে-৫-পর্যন্ত-সংখ্যা-গুলোর-যোগফল-নির্নয়-করো)
21. [For Loop Sum ForLoopVisualizer](#for-loop-sum-forloopvisualizer)
22. [1 থেকে 5 পর্যন্ত সংখ্যা গুলোর গুনণফল নির্নয় করো।](#1-থেকে-5-পর্যন্ত-সংখ্যা-গুলোর-গুনণফল-নির্নয়-করো)
23. [1^2 + 2^2 + 3^2 + 4^2 + 5^2 ধারার যোগফল নির্নয় করো।](#1^2-2^2-3^2-4^2-5^2-ধারার-যোগফল-নির্নয়-করো)
24. [1^1 + 2^2 + 3^3 + 4^4 + 5^5 ধারার যোগফল নির্নয় করো।](#1^1-2^2-3^3-4^4-5^5-ধারার-যোগফল-নির্নয়-করো)
25. [1X3 + 2X4 + 3X5 + 4X6 + 5X7 ধারার যোগফল নির্নয় করো।](#1x3-2x4-3x5-4x6-5x7-ধারার-যোগফল-নির্নয়-করো)
26. [1/1^2 + 1/2^2 + 1/3^2 + 1/4^2 + 1/5^2 ধারার যোগফল নির্নয় করো।](#1/1^2-1/2^2-1/3^2-1/4^2-1/5^2-ধারার-যোগফল-নির্নয়-করো)
27. [IF Else in Loops](#if-else-in-loops)

## Cover Page

![Cover Page](path/to/cover-image.png)

## Loops Intro

An introduction to loops, explaining their purpose and basic structure.

## Marathon Race Animation

A visual representation of a marathon race to demonstrate loop concepts.

## Loop Elements

Detailed explanation of the fundamental elements of loops.

## Loop Flow

Understanding the flow of control in loops.

## Types of Loops

Overview of different types of loops in C programming.

## For Loop Details

In-depth look at the for loop structure and usage.

## For Loop Visualizer

A visual tool to help understand how for loops work.

## While Loop Details

Detailed explanation of the while loop structure and usage.

## While Loop Visualizer

A visual tool to help understand how while loops work.

## Do-While Loop Details

In-depth look at the do-while loop structure and usage.

## Do-While Loop Visualizer

A visual tool to help understand how do-while loops work.

## 'Bondipathshala' word টি 5 বার প্রিন্ট করো।

Example code to print the word 'Bondipathshala' 5 times.

```c
#include <stdio.h>

int main() {
    for (int i = 0; i < 5; i++) {
        printf("Bondipathshala\n");
    }
    return 0;
}
```

## 1 থেকে 5 পর্যন্ত সংখ্যা গুলো প্রিন্ট করো।

Example code to print numbers from 1 to 5.

```c
#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        printf("%d\n", i);
    }
    return 0;
}
```

## 1 থেকে 10 পর্যন্ত বিজোড় সংখ্যা গুলো প্রিন্ট করো।

Example code to print odd numbers from 1 to 10.

```c
#include <stdio.h>

int main() {
    for (int i = 1; i <= 10; i += 2) {
        printf("%d\n", i);
    }
    return 0;
}
```

## 1 থেকে 10 পর্যন্ত জোড় সংখ্যা গুলো প্রিন্ট করো।

Example code to print even numbers from 1 to 10.

```c
#include <stdio.h>

int main() {
    for (int i = 2; i <= 10; i += 2) {
        printf("%d\n", i);
    }
    return 0;
}
```

## 1, 4, 7, ..., 25 সিরিজটি প্রিন্ট করো।

Example code to print the series 1, 4, 7, ..., 25.

```c
#include <stdio.h>

int main() {
    for (int i = 1; i <= 25; i += 3) {
        printf("%d\n", i);
    }
    return 0;
}
```

## 100, 90, 80, ..., 0 সিরিজটি প্রিন্ট করো।

Example code to print the series 100, 90, 80, ..., 0.

```c
#include <stdio.h>

int main() {
    for (int i = 100; i >= 0; i -= 10) {
        printf("%d\n", i);
    }
    return 0;
}
```

## 1 থেকে 5 পর্যন্ত সংখ্যা গুলোর যোগফল নির্নয় করো।

Example code to calculate the sum of numbers from 1 to 5.

```c
#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    printf("Sum: %d\n", sum);
    return 0;
}
```

## ১ থেকে ৫ পর্যন্ত সংখ্যা গুলোর যোগফল নির্নয় করো।

Example code to calculate the sum of numbers from 1 to 5.

```c
#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    printf("Sum: %d\n", sum);
    return 0;
}
```

## For Loop Sum ForLoopVisualizer

A visual tool to help understand the sum calculation using for loops.

## 1 থেকে 5 পর্যন্ত সংখ্যা গুলোর গুনণফল নির্নয় করো।

Example code to calculate the product of numbers from 1 to 5.

```c
#include <stdio.h>

int main() {
    int product = 1;
    for (int i = 1; i <= 5; i++) {
        product *= i;
    }
    printf("Product: %d\n", product);
    return 0;
}
```

## 1^2 + 2^2 + 3^2 + 4^2 + 5^2 ধারার যোগফল নির্নয় করো।

Example code to calculate the sum of squares from 1 to 5.

```c
#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i * i;
    }
    printf("Sum of squares: %d\n", sum);
    return 0;
}
```

## 1^1 + 2^2 + 3^3 + 4^4 + 5^5 ধারার যোগফল নির্নয় করো।

Example code to calculate the sum of powers from 1 to 5.

```c
#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += pow(i, i);
    }
    printf("Sum of powers: %d\n", sum);
    return 0;
}
```

## 1X3 + 2X4 + 3X5 + 4X6 + 5X7 ধারার যোগফল নির্নয় করো।

Example code to calculate the sum of the series.

```c
#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i * (i + 2);
    }
    printf("Sum: %d\n", sum);
    return 0;
}
```

## 1/1^2 + 1/2^2 + 1/3^2 + 1/4^2 + 1/5^2 ধারার যোগফল নির্নয় করো।

Example code to calculate the sum of the series.

```c
#include <stdio.h>

int main() {
    double sum = 0.0;
    for (int i = 1; i <= 5; i++) {
        sum += 1.0 / (i * i);
    }
    printf("Sum: %f\n", sum);
    return 0;
}
```

## IF Else in Loops

Understanding the use of if-else statements within loops.

## Conclusion

This lecture provides a comprehensive understanding of loops in C programming. Students are encouraged to practice the examples and explore further applications of loops in their coding projects.
