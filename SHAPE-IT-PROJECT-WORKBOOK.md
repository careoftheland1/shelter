# Shape It project workbook

## Purpose

Shape It should export a designed, editable `.xlsx` project workbook rather than treating a plain-text or CSV takeoff as the final planning document.

The workbook is a bridge between what the model can calculate and what a builder must determine locally. Shape It populates geometry-derived quantities. The builder adds local prices, waste, labor, reinforcement, assemblies and project-specific work.

The workbook is not a complete estimate, construction schedule, engineering document or substitute for local professional review.

## Core principle

> Shape It provides the quantities the geometry knows. The workbook makes room for everything it cannot know.

Generated information and user-entered information must remain visibly distinct throughout the workbook.

## Export format

- File type: `.xlsx`
- Suggested filename: `[project-name]-project-workbook.xlsx`
- Generated entirely in the browser
- No account or server required
- Opens in Microsoft Excel, Apple Numbers, LibreOffice and Google Sheets
- Contains formulas, formatting, frozen headers, filters and print-ready layouts

CSV may remain available as a secondary raw-data export, but it should not be the primary project document. CSV cannot provide multiple worksheets, formulas, formatting, instructions or a clear distinction between generated and editable values.

## Workbook structure

### 01 — Start Here

Purpose: orient the user and document the source and limits of the workbook.

Populate:

- Project name
- Export date and time
- Shape It project version
- Imperial or metric units
- Number of building volumes
- Selected wall systems
- Short project summary

Include:

- How to use the workbook
- Visual legend for generated, editable and calculated cells
- Explanation of preliminary quantities
- Instructions to enter local prices and verify units
- Warning that blank categories have not been calculated by Shape It
- Planning and construction disclaimer

### 02 — Material Takeoff

Purpose: provide transparent project totals and per-volume quantities derived from the Shape It model.

#### Project totals

Shape It can currently populate:

- Number of building volumes
- Net wall volume in cubic feet and cubic yards
- Estimated wall weight in tons
- Cement in 94-pound bags
- Soil in cubic yards for rammed-earth volumes
- Lavasand in cubic yards for lavacrete volumes
- Exterior formed wall area
- Interior formed wall area
- Total formed wall area
- Interior floor area

#### Per-volume schedule

Populate one row per volume:

- Volume number or name
- Shape: cubiform or cylinder
- Wall material
- Width and depth, or radius
- Wall height
- Wall thickness
- Roof type
- Net wall volume
- Estimated wall weight
- Cement bags
- Soil or lavasand quantity
- Exterior wall area
- Interior wall area
- Total formed wall area
- Floor area

#### Opening schedule

The Shape It project model also knows enough to populate:

- Host volume
- Opening type: door or window
- Host wall or cylindrical position
- Width
- Height
- Window sill height
- Quantity count

Opening product, frame, glazing, handing, structural header and local cost remain user-entered unless those concepts are added to Shape It later.

### 03 — Project Budget

Purpose: carry calculated quantities into an editable local cost plan.

Recommended columns:

| Column | Responsibility |
| --- | --- |
| Cost code | Template |
| Category | Template |
| Item | Shape It or template |
| Source | Shape It / user / allowance |
| Base quantity | Shape It where known |
| Unit | Shape It or template |
| Waste % | User input |
| Adjusted quantity | Formula |
| Local unit price | User input |
| Material subtotal | Formula |
| Labor allowance | User input |
| Equipment / delivery | User input |
| Total | Formula |
| Notes / source | User input |

Formula behavior:

- `Adjusted quantity = Base quantity × (1 + Waste %)`
- `Material subtotal = Adjusted quantity × Local unit price`
- `Total = Material subtotal + Labor allowance + Equipment / delivery`
- Category subtotals roll into the project summary
- Contingency is user-controlled and applied visibly rather than hidden in quantities

Rows populated from Shape It should include wall soil or lavasand, cement and other genuinely calculated quantities. Rows based only on area may carry the known area without implying that an assembly quantity has been determined.

### 04 — Complete the Takeoff

Purpose: make missing scope conspicuous and easy to add.

Provide organized blank rows for:

- Surveying and site preparation
- Excavation
- Drainage
- Footings and foundations
- Reinforcing steel and accessories
- Formwork
- Floor assembly
- Roof structure
- Roofing membrane and drainage
- Doors, windows, frames and hardware
- Plumbing
- Electrical
- Heating and cooling
- Interior fixtures
- Wall and floor finishes
- Equipment and tool rental
- Freight and delivery
- Permits and professional fees
- Testing and inspections
- Cleanup and waste
- Contingency

The user can add, delete and reorder rows without breaking project totals.

Rebar must remain user-entered until Shape It contains a reviewed foundation and reinforcement model. The workbook should never infer reinforcement from wall geometry alone.

### 05 — Sample Build Sequence

Purpose: provide an editable example order of work without presenting it as a calculated project schedule.

Recommended columns:

- Phase
- Task
- Predecessor
- Suggested order
- Duration
- Crew or responsibility
- Planned start
- Planned finish
- Actual finish
- Status
- Notes

Provide a sample sequence such as:

1. Due diligence, site information and local approvals
2. Survey, layout and access
3. Site preparation and drainage
4. Excavation
5. Foundations
6. Under-slab services
7. Floor or slab
8. Wall material testing and procurement
9. Formwork preparation
10. Wall construction
11. Openings and embedded components
12. Roof structure and weatherproofing
13. Doors and windows
14. Services and fixtures
15. Finishes
16. Testing, inspections and closeout

Durations, calendar dates, dependencies and crews remain editable. Shape It does not currently know site access, labor availability, curing requirements, jurisdictional review time, weather or procurement lead times.

### 06 — Assumptions

Purpose: expose every constant that materially affects the generated takeoff.

Current Shape It assumptions include:

- Cement bag weight: 94 pounds
- CSRE density: 130 pounds per cubic foot
- CSRE cement percentage: 8 percent
- CSRE soil density: 95 pounds per cubic foot
- Lavacrete density: 92 pounds per cubic foot
- Lavacrete cement percentage: 12.5 percent
- Lavasand density: 95 pounds per cubic foot

List each assumption with:

- Value
- Unit
- Source or basis
- Whether it is generated, a default or user-adjustable
- Effect on the workbook

Assumptions should initially be visible and documented. If user editing is later allowed, recalculation must be consistent across the workbook and clearly marked as departing from Shape It defaults.

## Visual system

Use a restrained Shelter on the Land workbook language:

- Warm paper background
- Dark olive-black headers
- Rust accent for user input
- Fine gray rules
- Monospaced labels
- Large, simple worksheet titles

Cell conventions:

- Neutral cells: generated by Shape It
- Rust-tinted cells: intended for user input
- Pale calculated cells: formulas
- Muted blank rows: scope Shape It cannot determine
- Warning cells: missing units, prices or required local verification

Other behavior:

- Freeze title and column-header rows
- Enable filters on schedules and budget tables
- Keep units in dedicated columns
- Avoid merged cells inside editable data tables
- Use named tables so new rows inherit formulas and formatting
- Set practical print areas and repeat headers when printing
- Include a footer with project name, export date and page number

## Technical implementation

Recommended approach:

1. Maintain a professionally designed XLSX template as a versioned asset.
2. Load the template in Shape It only when the user requests an export.
3. Populate project metadata, takeoff tables, openings and assumptions from the live model.
4. Preserve the template’s formatting and formulas.
5. Generate and download the completed workbook in the browser.

Recommended library: `ExcelJS`, loaded through a dynamic import so workbook support does not add weight to Shape It’s initial application bundle.

An alternative is SheetJS, but its community edition is better suited to data exchange than preserving a richly designed workbook. ExcelJS is the stronger fit for styled worksheets, formulas and template-driven output.

## Honest data boundary

### Shape It can populate now

- Volume geometry
- Wall material and thickness
- Roof selection
- Doors and windows
- Net wall volume
- Estimated wall weight
- Cement bags
- Soil or lavasand volume
- Formed wall area
- Floor area
- Project totals and per-volume totals

### Shape It should leave editable or blank

- Local prices
- Waste assumptions
- Labor and crew costs
- Taxes and freight
- Reinforcement
- Foundation quantities
- Roof assembly quantities
- Door and window products
- Mechanical, electrical and plumbing work
- Finishes
- Permits and professional fees
- Project durations and dates

## First-pass acceptance criteria

- A user can export a valid `.xlsx` workbook from any non-empty Shape It project.
- The file opens without repair warnings in Excel and LibreOffice.
- All current takeoff totals match the on-screen Shape It takeoff.
- Per-volume quantities match the model.
- Openings are listed accurately.
- Local-price cells are visibly editable.
- Budget formulas update when a user enters prices or adds waste.
- Adding a new custom budget row does not break totals.
- No blank project category is presented as zero calculated work.
- Sample sequence language does not imply a generated construction schedule.
- The disclaimer appears in the workbook and near the export action.
- Imperial and metric projects export consistently.

## Later capabilities

Once Shape It supports additional reviewed building systems, the same workbook can populate:

- Foundation concrete
- Excavation allowances
- Roof areas and assembly quantities
- Interior partitions
- Reinforcement schedules where justified by an appropriate engineering model
- Room and finish schedules
- Project-specific sequencing relationships

These should be added only when the underlying model contains enough information to calculate them honestly.
