"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Status = {
  value: string;
  label: string;
};

type Props = {
  placeholder: string;
  data: Status[];
  value?: string;
  onChange: (...event: any[]) => void;
};

export const ComboBoxReusable = ({
  data,
  onChange,
  placeholder,
  value,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>Selecione</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            data={data}
            onChange={onChange}
            placeholder={placeholder}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="justify-start border w-full">
          {selectedStatus ? <>{selectedStatus.label}</> : <>Selecione</>}
        </Button>
      </DrawerTrigger>
      <DrawerHeader className="hidden">
        <DrawerTitle></DrawerTitle>
      </DrawerHeader>
      <DrawerContent>
        <div className="mt-4 border-t w-full">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            data={data}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

function StatusList({
  setOpen,
  setSelectedStatus,
  data,
  onChange,
  placeholder,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
  onChange: (...event: any[]) => void;
  data: Status[];
  placeholder: string;
}) {
  return (
    <Command>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup>
          {data.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  data.find((priority) => priority.value === value) || null
                );
                setOpen(false);
                onChange(status.value);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
