/* eslint-disable react/display-name */
import * as React from "react";
import UriOverlayEditor from "../../data-grid-overlay-editor/private/uri-overlay-editor";
import { drawTextCell, prepTextCell } from "../data-grid-lib";
import { GridCellKind, type UriCell } from "../data-grid-types";
import type { InternalCellRenderer } from "./cell-types";

export const uriCellRenderer: InternalCellRenderer<UriCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Uri,
    needsHover: false,
    needsHoverPosition: false,
    useLabel: true,
    drawPrep: prepTextCell,
    draw: a => drawTextCell(a, a.cell.data, a.cell.contentAlign),
    measure: (ctx, cell, theme) => ctx.measureText(cell.data).width + theme.cellHorizontalPadding * 2,
    onDelete: c => ({
        ...c,
        data: "",
    }),
    provideEditor: () => p => {
        const { onChange, value, forceEditMode, validatedSelection } = p;
        return (
            <UriOverlayEditor
                forceEditMode={forceEditMode}
                uri={value.data}
                preview={value.displayData ?? value.data}
                validatedSelection={validatedSelection}
                readonly={value.readonly === true}
                onChange={e =>
                    onChange({
                        ...value,
                        data: e.target.value,
                    })
                }
            />
        );
    },
    onPaste: (toPaste, cell, details) =>
        toPaste === cell.data
            ? undefined
            : { ...cell, data: toPaste, displayData: details.formattedString ?? cell.displayData },
};
