const COMPETENCY_MAP = [
  { id: 'B1-K1-W1', label: 'W1 Planning', detect: () => true },
  { id: 'B1-K1-W2', label: 'W2 Ontwerp', detect: (p) => {
    const hay = [p.approach || '', p.description || ''].join(' ').toLowerCase();
    return /ontwerp|design|architect|erd|structuur|database.?ontwerp|technisch|alternative/.test(hay);
  }},
  { id: 'B1-K1-W3', label: 'W3 Realisatie', detect: () => true },
  { id: 'B1-K1-W4', label: 'W4 Testen', detect: () => true },
  { id: 'B1-K1-W5', label: 'W5 Verbetering', detect: () => true },
  { id: 'B1-K2-W1', label: 'W1 Samenwerking', detect: (p) => {
    const hay = [p.approach || '', p.role || '', p.learned || '', p.description || ''].join(' ').toLowerCase();
    return /team|samen|samenwerking|projectteam|collega|teamgenoot|kyandro/.test(hay);
  }},
  { id: 'B1-K2-W2', label: 'W2 Presentatie', detect: (p) => {
    const hay = [p.role || '', p.learned || '', p.description || ''].join(' ').toLowerCase();
    return /present|oplever|uitleg|toon|leg.*uit/.test(hay);
  }},
  { id: 'B1-K2-W3', label: 'W3 Evaluatie', detect: (p) => {
    const hay = [p.learned || '', p.approach || ''].join(' ').toLowerCase();
    return /evaluati|feedback|reflecti|open.*feedback|collega.*feedback/.test(hay);
  }}
];

function detectCompetencies(project) {
  return COMPETENCY_MAP.filter(c => c.detect(project)).map(c => c.id);
}
