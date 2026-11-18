import { Component, type ReactNode } from "react";
export function SceneFallback() {
  return (
    <div
      className="orbit-fallback"
      role="img"
      aria-label="Copper intelligence core with intersecting orbits"
    >
      <i />
      <i />
      <i />
      <b />
    </div>
  );
}
export default class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <SceneFallback /> : this.props.children;
  }
}
