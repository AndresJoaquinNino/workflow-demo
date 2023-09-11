export const COMPONENT_WIDTH = Object.freeze({
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  desktopLarge: 1440,
});

export const COMPONENT_HEIGHT = Object.freeze({
  navbar: '64px',
  sidebarWorkflow: 'calc(100vh - 100px)',
});

export const arrayFiller = (array, quantity, value) => {
  const newArray = [];
  for(let i = array.length; i < quantity; i++){
    newArray.push(value);
  }
  return [...array, ...newArray];
}