import '@testing-library/jest-dom'
import {render, fireEvent} from '@testing-library/svelte'

import ActionButtons from "../ActionButtons.svelte";

test("should render", () => {
  const {getByText} = render(ActionButtons, { disabledExport: false });

  expect(getByText("Export as CVS")).toBeInTheDocument();
});