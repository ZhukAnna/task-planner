const switcher = document.getElementById('switcher');
const mode = {
  dark: true,
};
switcher.addEventListener('click', () => {
  mode.dark = !mode.dark;
  switcher.classList.toggle('btn-toggle--on');

  if (mode.dark) {
    document.documentElement.style.setProperty('--main-bg-color', '#181f33');
    document.documentElement.style.setProperty('--dark-bg-color', '#0d111c');
    document.documentElement.style.setProperty('--light-bg-color', '#283456');
    document.documentElement.style.setProperty('--hover-bg-color', '#232d4a');
    document.documentElement.style.setProperty('--cell-color', '#131827');
    document.documentElement.style.setProperty('--text-color', '#f4f4f4');
  } else {
    document.documentElement.style.setProperty('--main-bg-color', '#fff');
    document.documentElement.style.setProperty('--dark-bg-color', '#cad1e6');
    document.documentElement.style.setProperty('--light-bg-color', '#f8f9fc');
    document.documentElement.style.setProperty('--hover-bg-color', '#e1e5f1');
    document.documentElement.style.setProperty('--cell-color', '#eceff6');
    document.documentElement.style.setProperty('--text-color', '#0d111c');
  }
});
