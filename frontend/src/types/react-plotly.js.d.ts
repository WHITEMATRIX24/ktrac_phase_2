declare module 'react-plotly.js' {
  import * as React from 'react';
  import { PlotParams } from 'plotly.js';

  const Plot: React.ComponentType<Partial<PlotParams>>;
  export default Plot;
}
