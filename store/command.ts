import { create } from "zustand";
import { Op_command, Op_command_line } from "../interfaces";

interface Command {
  commands: Op_command;
  commands_line: Op_command_line[];

  add_command: (product: Op_command) => void;
  add_command_line: (product: Op_command_line) => void;
}

const command_store = create<Command>()((set) => ({
  commands: null,
  commands_line: [],
  add_command: (value) =>
    set((store) => ({ ...store, products: value })),
  add_command_line: (value) =>
    set((store) => ({ ...store, commands_line: [...store.commands_line, value] })),
}));

export default command_store;
