"use client";

import { quotes } from "@/constants/quotes";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const QuotesDisplay = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);

  useEffect(() => {
    const updateQuote = () => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    };

    const interval = setInterval(updateQuote, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <Card className="p-4 rounded-2xl lg:max-w-md mx-auto">
      <CardHeader className="space-y-4">
        <CardTitle className="text-center font-normal italic">
          {currentQuote.quote}
        </CardTitle>
        <CardDescription className="text-end">
          {currentQuote.author}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
