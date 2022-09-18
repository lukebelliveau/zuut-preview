export function onReturnKey(handler: () => any) {
  return function(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Return' || event.key === 'Enter') {
      handler();
    }
  };
}