(function () {
	MediaBox('.mediabox');

	const scroll = new LocomotiveScroll();

	document.querySelectorAll('nav a').forEach((item) =>
		item.addEventListener('click', (ev) => {
			scroll.scrollTo(document.querySelector(item.getAttribute('href')), { offset: -120 });
			ev.preventDefault();
		})
	);
  document.querySelector('a.branding').addEventListener('click', (ev) => {
    scroll.scrollTo('top');
    ev.preventDefault();
  });

	const translateElement = (el, offset) => (el.style.transform = `translateY(${offset}px)`);

	const updateHeader = (el, offset) => {
		if (!el) {
			document.querySelector('header').classList.add('sticky');
			document.querySelector('body').classList.add('sticky-header');
			return;
		}
		el.classList.remove('sticky');
		document.querySelector('body').classList.remove('sticky-header');
		translateElement(el.querySelector('.logo'), offset * -0.5);
		translateElement(el.querySelector('h1'), offset * 0.5);
	};

	const updateSection = (el, offset) => {
    if (!el) {
      return;
    }
    const currentId = el.getAttribute('id');
    document.querySelectorAll('nav a:not([href="#' + currentId + '"])').forEach((el) => el.classList.remove('active'));
    document.querySelector('nav a[href="#' + currentId + '"]').classList.add('active');
  };

	scroll.on('scroll', ({ currentElements, scroll }) => {
		const yPos = scroll.y;
    const topElement = Object.values(currentElements)[0];
    if (!topElement) {
      return;
    }

		const header = topElement.el.localName === 'header' ? topElement.el : undefined;
		const activeSection = topElement.el.localName === 'section' ? topElement.el : undefined;

		updateHeader(header, yPos);
    updateSection(activeSection);
	});
})();
