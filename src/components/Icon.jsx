const paths = {
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  diagonal: 'M6 18 18 6M6 6h12v12',
  down: 'm6 9 6 6 6-6',
  close: 'm6 6 12 12M18 6 6 18',
  menu: 'M4 7h16M4 12h16M4 17h16',
  command:
    'M9 9V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V9Z',
  download: 'M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5',
  mail: 'M3 5h18v14H3V5Zm0 1 9 7 9-7',
  copy: 'M9 9h12v12H9V9Zm6-4V3H3v12h2',
  check: 'm5 12 4 4L19 6',
  code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18',
  terminal: 'm5 6 5 6-5 6m8 0h6',
  server:
    'M3 3h18v7H3V3Zm0 11h18v7H3v-7ZM7 6.5h.01M7 17.5h.01M12 6.5h5m-5 11h5',
  monitor: 'M3 3h18v14H3V3Zm5 18h8m-4-4v4',
  network: 'M9 2h6v6H9V2Zm-7 14h6v6H2v-6Zm14 0h6v6h-6v-6ZM12 8v4M5 16v-4h14v4',
  wrench: 'm14 6 4 4 4-4a7 7 0 0 1-9 9l-7 7-4-4 7-7a7 7 0 0 1 9-9l-4 4Z',
  layout: 'M3 3h18v18H3V3Zm0 5h18M9 8v13',
  layers: 'm12 2 10 6-10 6L2 8l10-6Zm-9 11 9 5 9-5M3 18l9 5 9-5',
  swords: 'm3 3 6 2 12 12-4 4L5 9 3 3Zm18 0-6 2-4 4m-2 6-6 6m0-8 8 8m2-18-4 4',
  gem: 'M7 3h10l5 7-10 12L2 10l5-7Zm-5 7h20M7 3l-1 7 6 12 6-12-1-7',
  spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  leaf: 'M20 3C8 1 1 8 6 16s17 3 14-13ZM4 21 16 8',
  calendar: 'M3 5h18v16H3V5Zm0 5h18M7 2v6m10-6v6',
  search: 'M21 21l-6-6M17 9a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  book: 'M12 5C9 2 4 2 2 3v17c3-1 7-1 10 2 3-3 7-3 10-2V3c-2-1-7-1-10 2Zm0 0v17',
  github:
    'M9 19c-4 1-4-2-6-2m12 5v-3.4c0-1 .1-1.5-.5-2.1 3.2-.4 6.5-1.6 6.5-7.1A5.5 5.5 0 0 0 19.5 6a5 5 0 0 0-.2-3.4S18 2.2 15 4a13 13 0 0 0-6 0C6 2.2 4.7 2.6 4.7 2.6A5 5 0 0 0 4.5 6 5.5 5.5 0 0 0 3 10.4c0 5.5 3.3 6.7 6.5 7.1-.6.6-.6 1.3-.5 2.1V22',
};
export default function Icon({ name, size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] || paths.spark} />
    </svg>
  );
}
