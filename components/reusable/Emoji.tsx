"use client";
import { Button } from "../ui/button";

import { EMOJIS } from "../../constants";
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface IEmoji {
  value: string;
  setValue: (prevState: string) => void;
}

export function Emoji({ setValue, value }: IEmoji) {
  return (
    <Popover>
      <PopoverTrigger className="text-3xl">
        {value ? value : "📚"}
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col justify-center items-center">
          <div className="space-y-2 flex items-center justify-center flex-col">
            <h4>Emoji</h4>
          </div>
          <div className="grid grid-cols-9 gap-2 py-2">
            {EMOJIS.map((emoji) => (
              <span
                key={emoji.nome}
                className="cursor-pointer hover:underline underline-offset-4"
                onClick={() => setValue(emoji.emoji)}
              >
                {emoji.emoji}
              </span>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
