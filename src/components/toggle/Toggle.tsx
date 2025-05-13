import { Switch } from "@headlessui/react";
import { classNames } from "../../utils/classnames";
/* -------------------------------------------------------------------------- */
/*                                type                                        */
/* -------------------------------------------------------------------------- */
type Props = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  label?: string;
  color: "green" | "red" | "yellow" | "blue";
};
const buttonColour: { [key: string]: string } = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  green: "bg-light-primary",
  yellow: "bg-yellow-500",
};
/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */
export default function Toggle({ enabled, setEnabled, label, color }: Props) {
  return (
    <Switch.Group as="div" className="flex flex-col items-start">
      <Switch.Label as="span" className="mb-1 text-sm">
        <span className="font-medium text-gray-900 dark:text-white">
          {label}
        </span>
      </Switch.Label>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none   focus:ring-${color} focus:ring-offset-2 `}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute h-full w-full rounded-md  dark:bg-surface-dark-secondary "
        />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? `bg-status-${color} ` : "bg-gray-200 focus:outline-none ",
            "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out focus:outline-none  "
          )}
        />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            `${buttonColour[color]} pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 dark:border-base-3-300   darshadow focus:outline-none ring-0 transition-transform duration-200 ease-in-out `
          )}
        />
      </Switch>
    </Switch.Group>
  );
}
