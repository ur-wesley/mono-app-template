import { err, ok, type Result } from "neverthrow";

export type HelloData = { message: string };
export type EchoData = { echo: string };

export const hello = (name?: string): Result<HelloData, Error> => {
  const value: HelloData = { message: `Hello ${name ?? "world"}` };
  return ok(value);
};

export const echo = (text: string): Result<EchoData, Error> => {
  if (text.length === 0) return err(new Error("text must not be empty"));
  return ok({ echo: text });
};
