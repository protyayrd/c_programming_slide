import { Book, Code, List, Terminal } from "lucide-react";
import ForLoopVisualizer from "./ForLoopVisualizer.jsx";
import WhileLoopVisualizer from "./WhileLoopVisualizer.jsx";
import CoverPage from "./CoverPage.jsx";
import LoopElements from "./LoopElements.jsx";
import MarathonRunnerAnimation from "./MarathonRunnerAnimation.jsx";
import ForLoopDetails from "./ForLoopDetails.jsx";
import LoopsIntroPage from "./LoopsIntroPage.jsx";
import TypesOfLoops from "./TypesOfLoops.jsx";
import WhileLoopDetails from "./WhileLoopDetails.jsx";
import DoWhileLoopDetails from "./DoWhileLoopDetails.jsx";
import DoWhileLoopVisualizer from "./DoWhileLoopVisualizer.jsx";
import Print5Numbers from "./Print5Numbers.jsx";
import PrintEvenNumbers from "./PrintEvenNumbers.jsx";
import PrintOddNumbers from "./PrintOddNumbers.jsx";
import SeriesPrint from "./SeriesPrint.jsx";
import SeriesPrintReverse from "./SeriesPrintReverse.jsx";
import SumOf5Numbers from "./SumOf5Numbers.jsx";
import ForLoopSumVisualizer from "./ForLoopSumVisualizer.jsx";
import SumCalculation from "./SumCalculation.jsx";
import LoopFlow from "./LoopFlow.jsx";
import SumOf_iXi2 from "./SumOf_iXi2.jsx";
import SumOf_iXi from "./SumOf_iXi.jsx";
import SumOf_ipowi from "./SumOf_ipowi.jsx";
import SumOf_1Fraci2 from "./SumOf_1Fraci2.jsx";
import ProductOf5Numbers from "./ProductOf5Numbers.jsx";
import ControlFlowLoopDetails from "./ControlFlowLoopDetails.jsx";
import PrintBondipathshala5Times from "./PrintBondipathshala5Times.jsx";
import ContinueStatement from "./ContinueStatement.jsx";
import BreakStatement from './BreakStatement';
import BreakExamples from './BreakExamples';
import ContinueExamples from './ContinueExamples';

const commonStyles = {
  background: "bg-gray-900", // Main background
  secondaryBg: "bg-gray-800", // Secondary/card background
  tertiaryBg: "bg-gray-700", // Tertiary/inner elements background
  border: "border-gray-800",
  text: {
    primary: "text-white",
    secondary: "text-gray-300",
    muted: "text-gray-400"
  },
  accent: {
    primary: "from-blue-600 to-blue-700",
    secondary: "from-cyan-500 to-cyan-600"
  }
};

const slides = [
  {
    indexTitle: "Cover Page",
    component: CoverPage,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    indexTitle: "Loops Intro",
    component: LoopsIntroPage,
    gradient: "from-blue-900 to-blue-800",
  },
  // {
  //   title: "Introduction to Loops",
  //   content: [
  //     "",
  //     "লুপ হল এক ধরনের প্রোগ্রামিং কাঠামো যা একই কোড ব্লকটিকে বারবার সম্পাদন করতে দেয়।",
  //     "এটি পুনরাবৃত্তিমূলক কাজ সম্পাদনের জন্য ব্যবহৃত হয়।",
  //     "__**^^লুপের মৌলিক বৈশিষ্ট্য^^:-**__",
  //     "পুনরাবৃত্তি��ূলক কাজ সম্পাদন।",
  //     "নির্দিষ্ট শর্ত পর্যন্ত চলে।",
  //     "কন্ট্রোল ভ্যারিয়েবল ব্যবহার করে লুপ পরিচালনা।",
  //   ],
  //   gradient: "from-blue-500 to-blue-700",
  //   icon: Book,
  // },
  // {
  //   title: "Fundamental Elements of Loops - I",
  //   content: [
  //     "__**^^Initialization^^:-**__",
  //     "--ইনিশিয়ালাইজেশন হল লুপের যাত্রার শুরুর বিন্ু।--",
  //     "--লুপ নিয়ন্ত্রণ এর জন্য এক বা একাধিক Variable তৈরি বা প্রাথমিক মান স্থাপন করে।--",
  //     "--লুপ শুরু হওয়ার আগে শুধুমাত্র একবার ঘটে।--",
  //     "Example: int i = 0;",
  //     "__**^^Condition^^:-**__",
  //     "--কন্ডিশন হল এক গুরুত্বপূর্ণ চেকপয়েন্ট যা সিদ্ধান্ত নেয় লুপ কি চলবে নাকি থেমে যাবে।--",
  //     "--Initialization এ তৈরি করা Variable এ�� ���পর এমন কিছু শর্ত দেওয়া যার মাধ্যমে True/False ফলাফল পাওয়া যায়।--",
  //     "--লুপের প্রতিটি Iteration এ Condition Check হবে।--",
  //     "--Condition সত্য(True) হলে লুপ চলবে এবং Condition মিথ্যা(False) হলে লুপ বন্ধ হয়ে যাবে।--",
  //     "Example: i < 10;",
  //   ],
  //   gradient: "from-blue-500 to-blue-700",
  //   icon: Book,
  // },
  // {
  //   title: "Fundamental Elements of Loops - II",
  //   content: [
  //     "__**^^Loop's Body^^:-**__",
  //     "লুপ বডি হল সেই কোড ব্লক যা বার বার সম্পাদিত হতে হয়। ",
  //     "--কন্ডিশন সত্য(True) থাকাকালীন বারবার সম্পাদিত হয়--",
  //     "--নির্দিষ্ট কাজ বা অপারেশন এখানে করা হয়।--",
  //     "Example: printf(\"%d \", i);",
  //     "__**^^Update^^:-**__",
  //     "--লুপের প্রতিটি Iteration এ Variable এর মান পরিবর্তন করা। সাধারণত Variable এর মান বাড়��নো ���া কমানো হয়।--",
  //     "--লুপের অবস্থার ক্রমাগত পরিবর্তন নিশ্চিত করে--",
  //     "--লুপের সমাপ্তি বিন্দুর দিকে এগোয়--",
  //     "Example: i++; বা, i = i + 1; বা, i--; বা, i = i - 1;",
  //   ],
  //   gradient: "from-blue-500 to-blue-700",
  //   icon: Book,
  // },

  {
    title: "১ থেকে ৫ পর্যন্ত সংখ্যা গুলো প্রিন্ট করার জন্য একটি C Program লিখ।",
    code: [
      { text: "#include <stdio.h>", color: "text-blue-300" },
      { text: "int main() {", color: "text-blue-300" },
      { text: "printf(\"1\\n\");", color: "text-blue-300" },
      { text: "printf(\"2\\n\");", color: "text-blue-300" },
      { text: "printf(\"3\\n\");", color: "text-blue-300" },
      { text: "printf(\"4\\n\");", color: "text-blue-300" },
      { text: "printf(\"5\\n\");", color: "text-blue-300" },
      { text: "return 0;", color: "text-blue-300" },
      { text: "}", color: "text-blue-300" },
    ],
    icon: Code,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "১ থেকে ৫ পর্যন্ত সংখ্যা গুলো প্রিন্ট করার জন্য একটি C Program লিখ।",
    code: [
      { text: "#include <stdio.h>", color: "text-blue-300" },
      { text: "int main() {", color: "text-blue-300" },
      { text: "int i = 1;", color: "text-blue-300" },
      { text: "printf(\"%d,\\n\", i++);", color: "text-blue-300" },
      { text: "printf(\"%d,\\n\", i++);", color: "text-blue-300" },
      { text: "printf(\"%d,\\n\", i++);", color: "text-blue-300" },
      { text: "printf(\"%d,\\n\", i++);", color: "text-blue-300" },
      { text: "printf(\"%d,\\n\", i++);", color: "text-blue-300" },
      { text: "return 0;", color: "text-blue-300" },
      { text: "}", color: "text-blue-300" },
    ],
    icon: Code,
    gradient: "from-blue-900 to-blue-800",
  },
  // {
  //   title: "Marathon Race Animation",
  //   indexTitle: "Marathon Race Animation",
  //   component: MarathonRunnerAnimation,
  //   icon: Terminal,
  //   gradient: "from-blue-900 to-blue-800",
  // },
  {
    indexTitle: "Loop Elements",
    component: LoopElements,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    indexTitle: "Loop Flow",
    component: LoopFlow,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    indexTitle: "Types of Loops",
    component: TypesOfLoops,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    indexTitle: "For Loop Details",
    component: ForLoopDetails,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    indexTitle: "For Loop Visualizer",
    component: ForLoopVisualizer,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    indexTitle: "While Loop Details",
    component: WhileLoopDetails,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    indexTitle: "While Loop Visualizer",
    component: WhileLoopVisualizer,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    indexTitle: "Do-While Loop Details",
    component: DoWhileLoopDetails,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    indexTitle: "'Do-While Loop Visualizer",
    component: DoWhileLoopVisualizer,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "'Bondipathshala' word টি 5 বার প্রিন্ট করো।",
    indexTitle: "'Bondipathshala' word টি 5 বার প্রিন্ট করো।",
    component: PrintBondipathshala5Times,
    icon: Terminal,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "1 থেকে 5 পর্যন্ত সংখ্যা গুলো প্রিন্ট করো।",
    indexTitle: "1 থেকে 5 পর্যন্ত সংখ্যা গুলো প্রিন্ট করো।",
    component: Print5Numbers,
    icon: Terminal,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "1 থেকে 10 পর্যন্ত বিজোড় সংখ্যা গুলো প্রিন্ট করো।",
    indexTitle: "1 থেকে 10 পর্যন্ত বিজোড় সংখ্যা গুলো প্রিন্ট করো।",
    component: PrintOddNumbers,
    icon: Terminal,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "1 থেকে 10 পর্যন্ত জোড় সংখ্যা গুলো প্রিন্ট করো।",
    indexTitle: "1 থেকে 10 পর্যন্ত জোড় সংখ্যা গুলো প্রিন্ট করো।",
    component: PrintEvenNumbers,
    icon: Terminal,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "1, 4, 7, ..., 25 সিরিজটি প্রিন্ট করো।",
    indexTitle: "1, 4, 7, ..., 25 সিরিজটি প্রিন্ট করো।",
    component: SeriesPrint,
    icon: Terminal,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "100, 90, 80, ..., 0 সিরিজটি প্রিন্ট ��রো।",
    indexTitle: "100, 90, 80, ..., 0 সিরিজটি প্রিন্ট করো।",
    component: SeriesPrintReverse,
    icon: Terminal,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "1 থেকে 5 পর্যন্ত সংখ্যা গুলোর যোগফল নির্নয় করো।",
    indexTitle: "1 থেকে 5 পর্যন্ত সংখ্যা গুলোর যোগফল নির্নয় করো।",
    component: SumOf5Numbers,
    icon: Terminal,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "১ থেকে ৫ পর্যন্ত সংখ্যা গুলোর যোগফল নির্নয় করো।",
    indexTitle: "১ থেকে ৫ পর্যন্ত সংখ্যা গুলোর যোগফল নির্নয় করো।",
    component: SumCalculation,
    icon: Terminal,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    indexTitle: 'For Loop Sum ForLoopVisualizer',
    component: ForLoopSumVisualizer,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "1 থেকে 5 পর্যন্ত সংখ্যা গুলোর গুনণফল নির্নয় করো।",
    indexTitle: "1 থেকে 5 পর্যন্ত সংখ্যা গুল����� গুনণফল নির্নয় করো।",
    component: ProductOf5Numbers,
    icon: Terminal,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "1^2^ + 2^2^ + 3^2^ + 4^2^ + 5^2^ ধারার যোগফল নির্নয় করো।",
    indexTitle: "1^2 + 2^2 + 3^2 + 4^2 + 5^2 ধারার যোগফল নির্নয় করো।",
    component: SumOf_iXi,
    icon: Terminal,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "1^1^ + 2^2^ + 3^3^ + 4^4^ + 5^5^ ধারার যোগফল নির্নয় করো।",
    indexTitle: "1^1 + 2^2 + 3^3 + 4^4 + 5^5 ধারার যোগফল নির্নয় করো।",
    component: SumOf_ipowi,
    icon: Terminal,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "1X3 + 2X4 + 3X5 + 4X6 + 5X7 ধারার যোগফল নির্নয় করো।",
    indexTitle: "1X3 + 2X4 + 3X5 + 4X6 + 5X7 ধারার যোগফল নির্নয় করো।",
    component: SumOf_iXi2,
    icon: Terminal,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "{1/1^2^} + {1/2^2^}  + {1/3^2^} + {1/4^2^} + {1/5^2^} ধারার যোগফল নির্নয় করো।",
    indexTitle: "1/1^2 + 1/2^2 + 1/3^2 + 1/4^2 + 1/5^2 ধারা��� য���গফল নির্নয় করো।",
    component: SumOf_1Fraci2,
    icon: Terminal,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    indexTitle: 'IF Else in Loops',
    component: ControlFlowLoopDetails,
    gradient: "from-blue-900 to-blue-800",
  },
  {
    id: 'continue-statement',
    title: 'Continue Statement',
    component: ContinueStatement,
  },
  {
    id: 'continue-examples',
    title: 'Continue Examples',
    component: ContinueExamples,
  },
  {
    id: 'break-statement',
    title: 'Break Statement',
    component: BreakStatement,
  },
  {
    id: 'break-examples',
    title: 'Break Examples',
    component: BreakExamples,
  },
];

export default slides;
