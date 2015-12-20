(function() {
	TriggerZone = {
		init: function() {
			this.icon = $("appcontent").appendChild($C("hbox", {
				id: "Trigger-Zone",
				class: "toolbar",
				tooltiptext: "觸發區域",
				style: "position: fixed; right: 16px; bottom: 16px; background: -moz-linear-gradient(top, rgb(252, 252, 252) 0%, rgb(245, 245, 245) 33%, rgb(245, 245, 245) 100%); min-width: auto; max-width: 94px; border: 2px solid rgb(144,144,144); border-radius: 5px;",
			}));

			for (let i = 0, Btn; Btn = mBtns[i]; i++) {
				var BtnItem = this.icon.appendChild($C("toolbarbutton", {
					id: Btn.id,
					tooltiptext: Btn.tooltiptext,
					image: Btn.image,
					class: "toolbarbutton-1",
					oncommand: Btn.oncommand,
//					onclick: Btn.onclick,
//					onDOMMouseScroll: Btn.onDOMMouseScroll,
					onmouseover: Btn.onmouseover,
//					style: Btn.style,
				}));
			}

			var css = '\
				#Trigger-Zone {opacity: 0.2!important; -moz-transition: opacity 0.3s ease-out!important;}\
				#Trigger-Zone:hover {opacity: 1!important; -moz-transition: opacity 0.2s ease-in!important;}\
				#Trigger-Zone toolbarbutton:active {margin-top: -1px!important; padding-bottom: 3px!important;}\
				'.replace(/[\r\n\t]/g, '');;
			this.icon.style = addStyle(css);
		}
	};

	var IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGElEQVRIie3BAQEAAACAkP6v7ggKAICqAQkYAAHO7iU+AAAAAElFTkSuQmCC"

	var mBtns = [
		{
			tooltiptext: "",
			image: IMG,
		},
		{
			id: "ScrollTop-button",
			tooltiptext: "滾動到頁面頂部",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADlUlEQVRIibXWXU8aWQAG4PM3+FttgbBUCwKHAQbD8KGgooAgKGxR+RDEj7XVtkqxFCmMot3tD+gmbKybmHhhspjUG5NSMUTg3Qu3bHFU2mz3JM/dvO+bnJmLIYQQwvO8aLu0F9wuvT0p7f6K/2K79PZku7QX5HleRAghJJPhRYXiTrrA7zSL2yX8CAV+p1ko7qQzGV5EcvlCMPem2Ngq8PiRcm+KjVy+ECTZ11uVbC6P/8XrrQp5uZltvdzM4ntkXuXaujzbIs83Mvge6+kM4okURpwuBKZCWHuxgfX07c+T1efr+FZrLzYwE4lBKpPjkaIPvokAApOhOzPkl6dr+BYrq88QiSUgf9gLlUqDcrmMer2O+dQCQj9PY2X12Y05srC0gm4Wl58gGk9CoVRBpaYol8v4co6Pj+EYdiIaT2Jx+YkgSxLzi7hLMrWEaDwJNWWg1eqwv7+P6yeXz4Oz2DCXXEAytdSRJ7G5edwlEp2DzmCEltHjw4cDQTkAVKtVuD1eDI2MIZ5IdeTJTCSO20zPxtBvsoA19uPg4M8by7+ccvkPqNQUPv8kZqNz7Q7yODwLgekIHodnYbXZwXEWHB4e3lkOAM1mE4uLy1AoVZgKhdsdZCoUxnXBUBju8QlIpHIUikXUahe4vLxEq9W6c+Tjx1MY+zmwRlO7i/gDQQhMhuAc8+DefTF6ehXgOAvGXG48XV1FrVbrKG00Gqh+/ox6vQ4A2N3dw8MeBby+APyBIMi4L4Abef2wWAfRp6J4pFDh3n0JOLMF5+fnHQN/VSoYHnbC4/EiGosjPD0DA2uCx+vHuC8A4nJ7cSuPDy6PD26PD4yOhdc3gctGQ/Byf5L3wGwZgNVmh23AgdExT7uDjDhd6MY56oZawyAeTwju/bd37yCVyTE8MgrnqPsf/2aJY2gE3Tmh7NNgfWNDMLD5KguxRIZB+zAcQ05Bllht9pZtwIFuFEoVSru7goH51AIeiKXt6/ma1WZvEZPZVuHMNnSj7FPj/fvfBd9+YHIKD8RScGarIGMy2yqEZU1BA2tqsEYOtzOBUgZHR0cdAxcXFxi0D0EskQkyBtbUYFlTkFBKRYzekGZ0bJPRsbhOp2ehZfQw9nM4PT3tGDg7OwOj00MskUGn78g1Gb0hTSm9+rOglIo0Wl2QUuZErdG2NJTB11RqCrtjCJ+q1Y6BSuUEPb0KiCUyaCgDtUbbopQ5ueq6Kv8bk0lvZN9IdNQAAAAASUVORK5CYII=",
			oncommand: "content.scrollTo(0, 0);",
		},
		{
			tooltiptext: "",
			image: IMG,
		},
		{
			id: "PrevPage-button",
			tooltiptext: "上一頁",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADbklEQVRIibXWSU9bVxjG8fM1/KHa0jCpppCE2NfTvdb1cPGAbUwYApiWqQyxMZCEFBHilIAxBgNNP0AjBCWVUiWLpmZBFywwo2z/u0CqIIxRwiv9Fkf3eZ+zuYsjhBAinU7rFjLLkYXMymZm6Vc+x0JmZXMhsxxJp9M6IYQQiURal5pfnEqlFwvzCxm+hFR6sZCaX5xKJNI6MZNMRWbm5vOzqTRf0szcfH4mmYqI6Zez2emZJDfi5WxWPH8xXXz+YpobUhQTzxLcJDE+Mcmnevx04tpZMfbkKdcVi4+h1fmQFQdd3X08Gv/5yh0xPPKIq8RHHxMdHkWxO5AVlWRqDn99kOjw6JncSbH4GGIoGucyD2MjDEXjuDQPsmLn7du/yOVyhBoa6ekbIDo8ysPYCANDMbp7+2lr7yQYakR1uLlnNCH6B6NcxesPYJPtvHnzJwBHR0e0tD7A5fbgrvNhstiorrlLRaWesvJKvtNXcbfWgGJ3IHr6BrhI70+DBEJh7KqDjY0NTs6T8XGcLo3m5lb6+weZfDZJZmmJ31+/5t3792xt/cvOzg7ix65eztXdR0O4CbvqZH39Dz6evb09dnd3yefzZ76dHNHR2cXHIj90E77fgtOlsbq6emnBVSMetEU4pb2TxqZW3Jrns8sBRFNLGyc1t7aj2J00NbVwcHDwyYWFQoH9/X22t7f5J5tFhBubOanxfgt21UVpWQU9PX38/eHDuUX5fIFsNsva2hqvXv1G4pdpYsNxOiKdBENhNM2D6nAhAsEwJwVDYfz1IWrvSXz1dQkGg8RsMsnOzs6pC3K5HD5/gLLySvRV1dy+U4tRMiMrDlxuD15fgPpAA8LnD3BWEK8vgOpwUfV9DSXflhIKhVlbW///rzk8PCQQDKGvqsbjrcfnD54jgHBr3qJW5+Mibs2L1aZQUalHX1VNfGSUra0tALq6eigtq8CteS/aLQrVqWUdTo3LOF0aqsOFwWiirLwSxe5geXmFjkgn35Tcwq46z91TnVpWyLIasclqXlYcXEaxH7PJdm7fqaWiUs+t0nL0VTXIinomb5PVvCyrESFJks5stU2ZLXLBbJG5isV6TDJZMRhNmMw2LNYzuYLZapuSJOn4ZSFJks5oskQkybxpMJqKRsnMdUgmy6mzwWgqSpJ587jruPw/6sdriwDSZvAAAAAASUVORK5CYII=",
			onmouseover: "nextPage.next();",
			oncommand: "nextPage.next();",
		},
		{
			tooltiptext: "",
			image: IMG,
		},
		{
			id: "NextPage-button",
			tooltiptext: "下一頁",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADnUlEQVRIibXW609aZxwH8Off4F/a0m4quk2EulaOKNQAehAO9/vlAN4mUC/dXKuoeBwCwgG0S9aXs69qSDqjcV1kyZp0MSVo5PLdC2OHFWi2tr/kkzzJ+T7f36uTPIQQQnieF2Tzu2w2/6SY3/kZHyKbf1LM5ndZnucFhBBCOI4XpDO5WJrP1TLZPJrhszvI8HlksjuX5xa5K2k+V0tncjGO4wUklc6wie1MNZnm0UwqzWMtxsFstcNgtGBtYxOpFtlGie1MNZFKs2RpeeVkYzOOrWQKidQ2tpLb2EqmEE/8a2pmFvmdXajUo1CqRnGVb8w0tZU8IcLur+v3BgahGdfB4/MjMreARyurWOfi4H5KILrOwR+cQKlUwuHhIUZGVNAbzFjn4tjYfK86GaM1oCgZekVidHZ1o0vYA1GfBLIhORi9CRabE6w/iIuLCwDAwcEB1KM0XG4f1mIcouvtkXK5jNev/8bLl39gf38fvzx9ing8jvmFRXh9LLQ6BivRKBrnxYvfQNPjCExMY3l1HY+jay0RtJlarYazszOcn5/f+FYoFKA3mDAzG8HS4xX88Gi5qbYL3jeFQgE2hwuz4Tksfv8jFh4u3fBBCwDg+fN9uD0+hCLzeDD/EJG5xWvI8fEx/nr1Cm/elFCpVP7zgnK5DKfLDYvNiVBkHrPhuWuI1e6E2WqH1eaA18siFIpgZXUV2VwOv+7t4fj4d1Sr1RvF9XodR0dHYP0BdHQKwRjMmP4ujKmZ0DUkODkDf3AKHl8AFpsTGi2DYfkI+r8dQJewB+NaBqVS6Vr56ekpuM1N3Om/i88+v4W796Tw+AIITs4gODF9DfH5J3CFDUy+5fH5IeqTwGA0v/0HKpUK9p49g1bH4PYXHegT34FmnIHb6wfb0NOIuD0sbvD6YbW70NHZjcnJKQBAsfgnwuEH+OobEXpFYozRWjhcXni8/pv3GxC704N3OZweMHoTbt3+Eh6vD+lMBsPy++gVSaBS07DanHC4vHA0ufsuYrE60IzRZIVY0o8uYQ/Ekn6MKEdhMttgtTmb5lshBqMFzRhNFjB6I2iNDozeBKPJCqOpebYdomMMaM3YoF2uNTJGa+u0RodPYYzW1olSTZ+o1DQ+BaWaPiEKhZKVK5RVxX0VPia5QllVKJQsoShKIBuWx2RDippsSIGPpCYblscoirp8WVAUJZAODrEUJSsOSAfrUkqG/2NAOlinKFnxsuuy/B8sv0iU9WgVDAAAAABJRU5ErkJggg==",
			onmouseover: "nextPage.next(true);",
			oncommand: "nextPage.next(true);",
		},
		{
			tooltiptext: "",
			image: IMG,
		},
		{
			id: "ScrollBottom-button",
			tooltiptext: "滾動到頁面底部",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADy0lEQVRIibXW3U9aZwAG8Pff4F/a0qWraYkoqZ1wRDkQPg6fA6dOqnj4lMqHCBbr5/RQBISDzHZZL+uuNF2isbFd5MKLtYsGCQWeXVgcIOKydG/yy7l5n+fJCSE5hBBCeJ4X5HZeslz8eUHY3QNGp0exWETjOT4+RigcQX7nF+R/fnmjXP5FIZffYXmeFxBCCOE4XpDh8xtZPl9NZbKgBgYhpWT488OHpoHT01O4PdPIZLeRzeU7yvDb1Ux2e53jeAFJpjNscitbSWV4pDM8TGYLRD1ivH//R9PA2dkZplgnuHgCqQx/q+RWtpJMZ1iS2EydJJJpJJJpJNNbsLNO3Ou6j/39/aaB8qdPcDjdiM4vYDO1hXqmo83UCdmIJ2ob8QQ24glwz5MIhMK413Ufv756hdYTCAThcHnBJZKoZ25RIys/cahbW+cwH1tEt0iMRCJxbWB5dRVmyw9Y24hjbf3yfmO+HbK4soZGC0srkFAyzM1Frg3kctsYkivxbHkVscVlRKIxLCytoLWjEXn6bAmNYovL0OoMmJpiUa1WmwZev96FUNQLWqHGw0f9EHb3QMsYEJlfQGtPHZmLxjAXjSEyv4C5aAzhyFOYLcMwGs24uLho+S+8g8FohsU6DI/Hi4lJOx4IRfD6/Ff5ViQ4G0EoHIVvJginywuX2wuX24Pl1VWUSqWmgUqlgvPzc5TLZQDAViaDR/1SPPGHEApHEZyNXENmArN44g+B0Rmxs/MCxWIR5XIZtVrt2m/QeE4KBQzJaZgtw/AHw5gJzLZFvD4/vD4/ZINyqDUMjo7ediyuv4k/EESv+CGc7mnUO9ohLvc0XB4fbI/t6BX3gVaocHh42HFgd/c3PBCKoDea4fb44HJP34hMOdyYcrjBOj2wTdjRL6GgVKpxcHDQtvzjx79gNJnRLRJjYpIF+zl/EzIxyeKK3QHbYzsGhxRQKNV48+b3awNcnMOdb+5Cw+gxaXegKd8G+dE2iUbjn59KlRYqtbZp5OjoLfr6voOwuxcjo+NXdzshI6PjaGvMBi1jAMPosbe3h1KpBNbhxFdf34FCqcHomK19rgWxWEdwE+vwKBi9EVpGj7Gxcdz9tguiHjHM31thHb4514iYzBZ0ZoVOb4KEkkEiHYCWMcBktt6S+QdhdMaaTm/CbfSGS//mbh2jM9aISqM7UWt0+D+oNLoTQtMqVk6rKrRCjS9JTqsqNK1iCUVRAtmQfF02SFdlgzS+kKpsSL5OUdTllwVFUQLpwCBLUbKCRDpQk1Iy/BcS6UCNomSFy67L8r8Brd9EvcV/vsAAAAAASUVORK5CYII=",
			oncommand: "content.scrollTo(0, 10000000000);",
		},
		{
			tooltiptext: "",
			image: IMG,
		},
	];
	TriggerZone.init();

	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
	function addStyle(css) {
		var pi = document.createProcessingInstruction(
			'xml-stylesheet',
			'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
		);
		return document.insertBefore(pi, document.documentElement);
	}
})();
