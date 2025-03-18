'use client';

import { useSorting } from 'src/components/providers/SortingProvider';
import { algorithms } from 'src/lib/algorithms';

export const useMetricsExport = () => {
  const sortingData = useSorting();

  if (
    !sortingData ||
    !sortingData.algorithm ||
    !sortingData.arraySize ||
    !sortingData.comparisons ||
    !sortingData.swaps
  ) {
    console.error('Invalid sorting data');
    return { handleExport: () => console.error('Export failed: Invalid sorting data') };
  }

  const { algorithm, arraySize, comparisons, swaps } = sortingData;

  if (!algorithms[algorithm[0] as keyof typeof algorithms]) {
    console.error(`Invalid algorithm: ${algorithm}`);
    return { handleExport: () => console.error('Export failed: Invalid algorithm') };
  }

  const handleExport = () => {
    const data = {
      algorithm,
      arraySize,
      comparisons,
      swaps,
      timestamp: new Date().toISOString(),
      timeComplexity: algorithms[algorithm[0]].complexity.time,
      spaceComplexity: algorithms[algorithm[0]].complexity.space,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = `sort-metrics-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error during file export:', error);
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  return { handleExport };
};