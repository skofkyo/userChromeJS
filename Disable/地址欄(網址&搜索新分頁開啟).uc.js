eval("gURLBar.handleCommand = " + gURLBar.handleCommand.toString()
  .replace(/aTriggeringEvent\s*&&\s*aTriggeringEvent.altKey/, "!($&)")
  .replace("aTriggeringEvent.preventDefault();", "")
  .replace("aTriggeringEvent.stopPropagation();", "")
);