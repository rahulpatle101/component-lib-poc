/* jquery nice select transformed into styled select using vanilla js  */
/* credit: https://github.com/hernansartorio/jquery-nice-select */

const create_nice_select = (selectElement) => {

		// add drop down markup
		const selectorField = selectElement.insertAdjacentElement('afterend', document.createElement('div'))
		selectorField.classList.add('styled-select')
		selectElement.getAttribute('class') && selectorField.classList.add(selectElement.getAttribute('class'))
		selectElement.getAttribute('disabled') && selectorField.classList.add('disabled')
		selectorField.setAttribute('tabindex', selectElement.getAttribute('disabled') ? null : '0')
		selectorField.innerHTML = '<span class="current"></span><ul class="list"></ul>'

		// elements
		const dropdown = selectElement.nextElementSibling
		const options = selectElement.querySelectorAll('option')
		const selectorList = selectorField.querySelector('.list')

		// select first list item text or its display name
		dropdown.querySelector('.current').innerHTML =  options[0].getAttribute('data-display')  || options[0].textContent

		options.forEach((option) => {
				const listItem = document.createElement('li')
				const dropDownListItem = dropdown.querySelector('ul').appendChild(listItem)
				dropDownListItem.setAttribute('data-value', option.value)

				const optionDisplay = option.getAttribute('data-display')
				optionDisplay ? dropDownListItem.setAttribute('data-display', optionDisplay) : ''
				dropDownListItem.classList.add('option')
				option.selected && dropDownListItem.classList.add('selected')
				option.disabled && dropDownListItem.classList.add('disabled')
				dropDownListItem.innerHTML = option.textContent
		})

		// dropdown click - stop propagration to allow closing dropdown on outside click
		selectorField.addEventListener('click', (event) => {
			event.stopPropagation();
    	_toggleClass(dropdown, 'open');

			if(_hasClass(dropdown, 'open')){
				dropdown.querySelector('.focus') && dropdown.querySelector('.focus').classList.remove('focus')
				dropdown.querySelector('.selected') && dropdown.querySelector('.selected').classList.add('focus')
			} else {
				dropdown.focus()
			}
    });

		// close on outside click
		document.addEventListener('click', (event) => {
			selectorField.classList.remove('open')
    });

		// option click
    selectorList.addEventListener('click', (event) => {
			if(_hasClass(event.target, 'disabled')) {
				return false;
			}

      const option = event.target;
      dropdown.querySelector('.selected').classList.remove('selected');
      option.classList.add('selected');
			const optionDisplay = option.getAttribute('data-display');

			if(optionDisplay) {
				dropdown.querySelector('.current').textContent = optionDisplay
			} else {
				dropdown.querySelector('.current').textContent = option.textContent
			}

			// represent option of the select element
			const selectOption = dropdown.previousElementSibling.querySelector(`option[value="${option.getAttribute('data-value')}"]`)
			// dispatch onchange event
			dispatchEvent(selectOption, 'change', true)
    });

		// Keyboard events
    selectorField.addEventListener('keydown', (event) => {
			const dropdown = event.target

      const focused_option = dropdown.querySelector('.focus') || dropdown.querySelector('.list .option.selected');


      // Space or Enter
      if (event.keyCode == 32 || event.keyCode == 13) {

        if (!_hasClass(dropdown, 'open')) {
					dispatchEvent(selectorField, 'click', true)
        } else {
					dispatchEvent(focused_option, 'click', true)
        }
        return false;
      // Down
      } else if (event.keyCode == 40) {
        if (!_hasClass(dropdown, 'open')) {
          dispatchEvent(selectorField, 'click');
        } else {
					let next = focused_option.nextElementSibling
					// skip disabled elements
					while(_hasClass(next, 'disabled')) {
						next = next.nextElementSibling
					}
          // var $next = $focused_option.nextAll('.option:not(.disabled)').first();
          if (next) {
            dropdown.querySelector('.focus').classList.remove('focus');
            next.classList.add('focus');
          }
        }
				return false;
      // Up
      } else if (event.keyCode == 38) {
        if (!_hasClass(dropdown, 'open')) {
          dispatchEvent(selectorField, 'click');
        } else {
					let prev = focused_option.previousElementSibling
          //skip disabled elements
					while(_hasClass(prev, 'disabled')) {
						prev = prev.previousElementSibling
					}
          if (prev) {
            dropdown.querySelector('.focus').classList.remove('focus');
            prev.classList.add('focus');
          }
        }
				return false;
      // Esc
      } else if (event.keyCode == 27) {
        if (_hasClass(dropdown, 'open')) {
          dispatchEvent(dropdown, 'click')
        }
      // Tab
      } else if (event.keyCode == 9) {
        if (_hasClass(dropdown, 'open')) {
          return false;
        }
      }
    });

		return selectElement;

}

// helpers functions

const _toggleClass = (element, className) => {
	if(element.classList.contains(className)) {
		element.classList.remove(className)
	} else {
		element.classList.add(className)
	}
}

const _hasClass = function(element, className) {
	if(!element) {
		return false
	}
	return element.classList.contains(className)
}

const dispatchEvent = (element, eventName, bubbles=false) => {
	const event = document.createEvent("HTMLEvents");
  event.initEvent(eventName, bubbles, true);
  element.dispatchEvent(event);
}

