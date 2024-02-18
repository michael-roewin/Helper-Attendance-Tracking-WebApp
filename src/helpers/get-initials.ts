export const getInitials = (firstWord?: string, secondWord?: string) => {
  return `${firstWord?.[0]?.toUpperCase() || ''}${secondWord?.[0]?.toUpperCase() || ''}`;
}