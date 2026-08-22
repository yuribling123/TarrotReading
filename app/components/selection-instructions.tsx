type SelectionInstructionsProps = {
  firstLine: string;
  secondLine: string;
};

export function SelectionInstructions({ firstLine, secondLine }: SelectionInstructionsProps) {
  return (
    <div className="selectionInstructions">
      <p>{firstLine}</p>
      <p>{secondLine}</p>
    </div>
  );
}
