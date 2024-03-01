"use client";

import React, { useState } from "react";
import { cn } from "../../../lib/utils";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Menu } from "../../../components/reusable/Menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { Emoji } from "../../../components/reusable/Emoji";
import { EMOJIS } from "../../../constants";
import { Checkbox } from "../../../components/ui/checkbox";
import { Id } from "../../../convex/_generated/dataModel";
import { Trash } from "lucide-react";

interface IWeek {
  dayOfWeek: string;
}

const taskSchema = z.object({
  description: z.string().min(1, {
    message: "Tarefa tem que conter no minimo 1 caractere.",
  }),
});

function ShowTask({ dayOfWeek }: IWeek) {
  const task = useQuery(api.tasks.get, { dayOfWeek: dayOfWeek });
  const update = useMutation(api.tasks.update);
  const remove = useMutation(api.tasks.remove);

  const onRemove = (id: string) => {
    const promise = remove({ id: id as Id<"tasks"> });

    toast.promise(promise, {
      loading: "Removendo tarefa...",
      success: "Tarefa deletada com sucesso!",
      error: "Houve um erro!",
    });
  };

  const updateIsCompleted = (isCompleted: boolean, id: string) => {
    update({
      id: id as Id<"tasks">,
      isCompleted: isCompleted,
    });
  };

  return (
    <div className="dark:bg-black/30 bg-slate-100 rounded-lg">
      {task?.length === 0 ? (
        <small className="p-2 text-start">
          Nenhuma tarefa foi criada até o momento.
        </small>
      ) : (
        task?.map((t) => (
          <div
            key={t._id}
            className="w-full flex items-center justify-between p-3"
          >
            <small
              className={cn(
                "flex items-center justify-start gap-x-2 capitalize",
                t.isCompleted && "line-through"
              )}
            >
              <Checkbox
                checked={t.isCompleted}
                onCheckedChange={() => updateIsCompleted(!t.isCompleted, t._id)}
              />
              {t.description} {t.emoji}
            </small>
            <Trash
              className="w-4 h-4 cursor-pointer"
              onClick={() => onRemove(t?._id)}
            />
          </div>
        ))
      )}
    </div>
  );
}

function CreateTask({ dayOfWeek }: IWeek) {
  const create = useMutation(api.tasks.create);
  const [emoji, setEmoji] = useState("");
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof taskSchema>) {
    const promise = create({
      dayOfWeek: dayOfWeek,
      description: data.description,
      isCompleted: false,
      emoji: emoji,
    });

    toast.promise(promise, {
      loading: "Criando tarefa...",
      success: "Tarefa criada com sucesso!",
      error: "Houve um erro",
    });
  }

  return (
    <Menu icon={<PlusIcon />}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex">
            <div className="w-full">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tarefa</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Geografia"
                        {...field}
                        className="border-b outline-none border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-end justify-center w-[80px]">
              <Emoji setValue={setEmoji} value={emoji} />
            </div>
          </div>
          <Button size="full" type="submit">
            Salvar
          </Button>
        </form>
      </Form>
    </Menu>
  );
}

export function Week({ dayOfWeek }: IWeek) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      className={cn(
        "min-w-96 transition-all",
        isVisible ? "h-auto max-h-[none]" : "h-10 max-h-10"
      )}
    >
      <div className="flex items-center justify-between">
        <h5 className="cursor-pointer font-bold p-1 text-xs rounded-md">
          {dayOfWeek}
        </h5>

        <div className="space-x-2">
          <CreateTask dayOfWeek={dayOfWeek} />

          <button
            onClick={() => setIsVisible(!isVisible)}
            className="cursor-pointer"
          >
            {isVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </div>
      </div>
      {isVisible && (
        <div
          className={cn(
            "my-2 scrollbar-custom max-h-64 overflow-y-auto",
            isVisible ? "slide-down" : ""
          )}
        >
          <ShowTask dayOfWeek={dayOfWeek} />
        </div>
      )}
    </div>
  );
}
