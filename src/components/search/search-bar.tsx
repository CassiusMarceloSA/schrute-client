import { useDebounce } from "@/hooks";
import { cn } from "@/lib/utils";
import { taskService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "../shared";
import { SearchContent } from "./search-content";

const Overlay = ({
  active,
  children,
  ...props
}: {
  active: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 h-screen w-screen z-40 bg-black/70 grid place-items-center",
        {
          "pointer-events-none opacity-0": !active,
        }
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const SearchBar = () => {
  const [active, setActive] = useState(false);
  const [term, setTerm] = useState("");
  const debouncedQuery = useDebounce(term, 500);
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchTasks = async (query?: string) => {
    const { tasks } = await taskService.getTasks(query);
    return tasks;
  };

  const { data: tasks, refetch } = useQuery({
    queryKey: ["filtered-tasks", debouncedQuery],
    queryFn: () => fetchTasks(debouncedQuery),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  }, []);

  const handleActive = () => {
    if (active) return;
    setActive(true);
  };

  const reset = useCallback(() => {
    setActive(false);
    setTerm("");
  }, []);

  const checkIsEditableElement = () => {
    const element = document.activeElement;
    return element?.tagName === "INPUT" || element?.tagName === "TEXTAREA";
  };

  const handlePress = useCallback(
    (e: KeyboardEvent) => {
      const isSlashKey = e.key === "/";
      if (isSlashKey) {
        if (checkIsEditableElement()) {
          return;
        }
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }

      const isEscapeKey = e.key === "Escape";
      if (isEscapeKey) {
        reset();
        inputRef.current?.blur();
        return;
      }
    },
    [reset]
  );

  useEffect(() => {
    document.addEventListener("keydown", handlePress);
    return () => {
      document.removeEventListener("keydown", handlePress);
    };
  }, [handlePress]);

  useEffect(() => {
    if (debouncedQuery) {
      refetch();
    }
  }, [debouncedQuery, refetch]);

  return (
    <>
      <Overlay
        active={active}
        onClick={(e) => {
          const element = e.target as HTMLElement;
          if (element.tagName === "DIV") {
            reset();
          }
        }}
      >
        <SearchContent tasks={tasks || []} />
      </Overlay>
      <Input.Container
        className={cn("w-auto", {
          "bg-purple-900": active,
          "border-purple-800": active,
          "z-50": active,
        })}
      >
        <Search size={18} />
        <Input.Field
          autoComplete="off"
          onFocus={handleActive}
          onChange={handleChange}
          value={term}
          className={cn("transition-all", {
            "w-96": active,
            "placeholder:text-neutral-200": active,
          })}
          name="search"
          placeholder="Search..."
          ref={inputRef}
        />
      </Input.Container>
    </>
  );
};
export default SearchBar;
