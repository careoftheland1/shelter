# Home-page particle cluster checkpoint

- `prior-four-volumes.jsx` is the exact tracked source from before the six-volume experiment.
- `current-six-volumes.jsx` is the current local source as of this checkpoint. It arranges six varied cuboids around a larger courtyard and fits them to the viewport.
- The active component is now `src/ParticleCubeAssembly.jsx`, which offers both archived layouts on `/elements/`. The snapshots retain the exact source for each earlier version.
- The six-volume version was visually checked at desktop and mobile widths. The next planned adjustment was to increase the gap between the front and back rows; that adjustment has **not** been made.
- These files are source snapshots, not standalone components. To restore a version, copy its contents into `src/ParticleCubeAssembly.jsx`.
