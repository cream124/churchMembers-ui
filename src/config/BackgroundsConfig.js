
const defaultColor = 'rgba(240, 240, 183, 0.3)'
// 'linear-gradient(45deg, #FE6B88 30%, #FF8E53 90%)';

function getTableBackgroundColor(name) {
  const tableBackgroundColor = {
    events: 'rgba(181, 68, 192, 0.34)',
    days: defaultColor,
    services: defaultColor,
    actives: defaultColor,
    forApproval: defaultColor
  };
  return tableBackgroundColor[name]
}

function getEventsPanelgroundColor() {
  const tableBackgroundColor = {
    eventPanel1: '#37474f !important',
    eventPanel: '#fafafa !important',
    dayPanel: '#e0e0e0 !important',
    servicePanel: '#bdbdbd !important',
  };
  return tableBackgroundColor
}

module.exports = {
  getTableBackgroundColor,
  getEventsPanelgroundColor: getEventsPanelgroundColor //{eventPanel: '#37474f !important'}
}