type ReadingErrorProps = {
  actionLabel?: string;
  message: string;
  onAction?: () => void;
};

export function ReadingError({ actionLabel, message, onAction }: ReadingErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="error" role="alert">
      <p>{message}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} type="button">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
