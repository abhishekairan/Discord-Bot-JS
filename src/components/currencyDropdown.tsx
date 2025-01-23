"use client"

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useStore } from "@/store/store";

const SUPPORTED_CURRENCIES = ["inr", "usd", "cad", "aud", "sgd"]; // Add more currencies here

interface CurrencyDropdownProps {
  onCurrencyChange: (currency: string) => void;
  className?: string;
}

export default function CurrencyDropdown({ onCurrencyChange, className = "" }: CurrencyDropdownProps) {
  const {selectedCurrency } = useStore();

  const handleCurrencyChange = (currency: string) => {
    onCurrencyChange(currency);
  };

  return (
    <div >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={`${className}`}>
            {selectedCurrency.toUpperCase()}{" "}
            <ChevronDown className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-zinc-700 text-gray-200">
          {SUPPORTED_CURRENCIES.map((currency) => (
            <DropdownMenuItem
              key={currency}
              onClick={() => handleCurrencyChange(currency)}
              className="hover:bg-zinc-800 dark:hover:bg-zinc-800"
            >
              {currency.toUpperCase()}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

