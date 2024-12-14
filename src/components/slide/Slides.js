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
    component: CoverPage,
  },
  {
    component: LoopsIntroPage,
  },
  // {
  //   title: "Introduction to Loops",
  //   content: [
  //     "",
  //     "লুপ হল এক ধরনের প্রোগ্রামিং কাঠামো যা একই কোড ব্লকটিকে বারবার সম্পাদন করতে দেয়।",
  //     "এটি পুনরাবৃত্তিমূলক কাজ সম্পাদনের জন্য ব্যবহৃত হয়।",
  //     "__**^^লুপের মৌলিক বৈশিষ্ট্য^^:-**__",
  //     "পুনরাবৃত্তিমূলক কাজ সম্পাদন।",
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
  //     "--ইনিশিয়ালাইজেশন হল লুপের যাত্রার শুরুর বিন্��ু।--",
  //     "--লুপ নিয়ন্ত্রণ এর জন্য এক বা একাধিক Variable তৈরি বা প্রাথমিক মান স্থাপন করে।--",
  //     "--লুপ শুরু হওয়ার আগে শুধুমাত্র একবার ঘটে।--",
  //     "Example: int i = 0;",
  //     "__**^^Condition^^:-**__",
  //     "--কন্ডিশন হল এক গুরুত্বপূর্ণ চেকপয়েন্ট যা সিদ্ধান্ত নেয় লুপ কি চলবে নাকি থেমে যাবে।--",
  //     "--Initialization এ তৈরি করা Variable এর উপর এমন কিছু শর্ত দেওয়া যার মাধ্যমে True/False ফলাফল পাওয়া যায়।--",
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
  //     "--লুপের প্রতিটি Iteration এ Variable এর মান পরিবর্তন করা। সাধারণত Variable এর মান বাড়ানো বা কমানো হয়।--",
  //     "--লুপের অবস্থার ক্রমাগত পরিবর্তন নিশ্চিত করে--",
  //     "--লুপের সমাপ্তি বিন্দুর দিকে এগোয়--",
  //     "Example: i++; বা, i = i + 1; বা, i--; বা, i = i - 1;",
  //   ],
  //   gradient: "from-blue-500 to-blue-700",
  //   icon: Book,
  // },
  {
    title: "Marathon Race Animation",
    component: MarathonRunnerAnimation,
    gradient: "from-purple-500 to-purple-700",
    icon: Terminal,
  },
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
    gradient: "from-green-500 to-green-700",
    icon: Code,
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
    gradient: "from-green-500 to-green-700",
    icon: Code,
  },
  {
    component: LoopElements,
  },
  {
    component: LoopFlow,
  },
  {
    component: TypesOfLoops,
  },
  {
    component: ForLoopDetails,
  },
  {
    component: ForLoopVisualizer,
  },
  {
    component: WhileLoopDetails,
  },
  {
    component: WhileLoopVisualizer,
  },
  {
    component: DoWhileLoopDetails,
  },
  {
    component: DoWhileLoopVisualizer,
  },
  {
    title: "1 থেকে 5 পর্যন্ত সংখ্যা গুলো প্রিন্ট করো।",
    component: Print5Numbers,
    gradient: "from-purple-500 to-purple-700",
    icon: Terminal,
  },
  {
    title: "1 থেকে 10 পর্যন্ত বিজোড় সংখ্যা গুলো প্রিন্ট করো।",
    component: PrintOddNumbers,
    gradient: "from-purple-500 to-purple-700",
    icon: Terminal,
  },
  {
    title: "1 থেকে 10 পর্যন্ত জোড় সংখ্যা গুলো প্রিন্ট করো।",
    component: PrintEvenNumbers,
    gradient: "from-purple-500 to-purple-700",
    icon: Terminal,
  },
  {
    title: "1, 4, 7, ..., 25 সিরিজটি প্রিন্ট করো।",
    component: SeriesPrint,
    gradient: "from-purple-500 to-purple-700",
    icon: Terminal,
  },
  {
    title: "100, 90, 80, ..., 0 সিরিজটি প্রিন্ট করো।",
    component: SeriesPrintReverse,
    gradient: "from-purple-500 to-purple-700",
    icon: Terminal,
  },
  {
    title: "1 থেকে 5 পর্যন্ত সংখ্যা গুলোর যোগফল নির্নয় করো।",
    component: SumOf5Numbers,
    gradient: "from-purple-500 to-purple-700",
    icon: Terminal,
  },
  {
    title: "১ থেকে ৫ পর্যন্ত সংখ্যা গুলোর যোগফল নির্নয় করো।",
    component: SumCalculation,
    gradient: "from-purple-500 to-purple-700",
    icon: Terminal,
  },
  {
    component: ForLoopSumVisualizer,
  },
  {
    title: "1 থেকে 5 পর্যন্ত সংখ্যা গুলোর গুনণফল নির্নয় করো।",
    component: ProductOf5Numbers,
    gradient: "from-purple-500 to-purple-700",
    icon: Terminal,
  },
  {
    title: "1^2^ + 2^2^ + 3^2^ + 4^2^ + 5^2^ ধারার যোগফল নির্নয় করো।",
    component: SumOf_iXi,
    gradient: "from-purple-500 to-purple-700",
    icon: Terminal,
  },
  {
    title: "1^1^ + 2^2^ + 3^3^ + 4^4^ + 5^5^ ধারার যোগফল নির্নয় করো।",
    component: SumOf_ipowi,
    gradient: "from-purple-500 to-purple-700",
    icon: Terminal,
  },
  {
    title: "1X3 + 2X4 + 3X5 + 4X6 + 5X7 ধারার যোগফল নির্নয় করো।",
    component: SumOf_iXi2,
    gradient: "from-purple-500 to-purple-700",
    icon: Terminal,
  },
  {
    title: "{1/1^2^} + {1/2^2^}  + {1/3^2^} + {1/4^2^} + {1/5^2^} ধারার যোগফল নির্নয় করো।",
    component: SumOf_1Fraci2,
    gradient: "from-purple-500 to-purple-700",
    icon: Terminal,
  },
  {
    component: ControlFlowLoopDetails,
  },
];

export default slides;