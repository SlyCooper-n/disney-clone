import { DialogProps } from "@core/types";
import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { FormEvent } from "react";

export const Dialog = (props: DialogProps) => {
  function submitDialog(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const inputObject = Object.fromEntries(formData);

    props.onSubmit && props.onSubmit(inputObject);
  }

  return (
    <Root open={props.open} onOpenChange={props.toggleDialog}>
      <Trigger asChild>{props.children}</Trigger>

      <Portal>
        <Overlay className="fixed top-0 w-screen h-screen bg-black bg-opacity-60" />

        <Content className="card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-300 z-50">
          <div className="card-body relative">
            <Close className="absolute top-4 right-4 flex justify-center items-center">
              <X weight="bold" />
            </Close>

            <Title className="card-title">{props.title}</Title>

            <Description>{props.description}</Description>

            <form onSubmit={submitDialog} className="mt-8 flex flex-col gap-4">
              {props.labelFields.map((field) => (
                <label
                  key={field.inputName}
                  className="w-full flex items-center gap-4"
                >
                  <span className="flex-1">{field.label}:</span>

                  <input
                    type="text"
                    name={field.inputName}
                    required={field.required ?? false}
                    className="input input-sm flex-[3] focus:ring ring-blue-500 focus:ring-offset-4 ring-offset-base-300"
                  />
                </label>
              ))}

              <div className="card-actions mt-4 justify-end">
                <button
                  type="submit"
                  className="btn bg-blue-500 text-white hover:bg-blue-500 hover:brightness-50 focus:ring ring-blue-500 focus:ring-offset-4 ring-offset-base-300"
                >
                  {props.submitButtonText}
                </button>
              </div>
            </form>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};
