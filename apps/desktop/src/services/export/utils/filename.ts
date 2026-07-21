// src/services/export/filename.ts

export const generateExportFileName = (
  moduleName: string,
): string => {
  const now = new Date();

  const date = now.toISOString().split("T")[0];

  const time = now
    .toTimeString()
    .slice(0, 5)
    .replace(":", "-");

  return `${moduleName}_${date}_${time}`;
};