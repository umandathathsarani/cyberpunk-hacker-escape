const storyNodes = [
  {
    id: 1,
    text: "You wake up in a cold, dimly lit server room. Alarms are blaring. Corporate security is on their way. You need to access the mainframe to escape.",
    options: [
      {
        text: "Search the server racks",
        nextText: 2
      },
      {
        text: "Try the locked door",
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: "You find a SECURITY KEYCARD hidden under a loose floorboard.",
    options: [
      {
        text: "Take the keycard and approach the door",
        setState: { keycard: true },
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: "The door is locked with a biometric scanner. There is an emergency override terminal next to it.",
    options: [
      {
        text: "Swipe the SECURITY KEYCARD",
        requiredState: (currentState) => currentState.keycard,
        nextText: 4
      },
      {
        text: "Try to hack the terminal manually",
        nextText: 5
      }
    ]
  },
  {
    id: 4,
    text: "The door slides open with a hiss. You step into the main corridor. Freedom is just a few firewall breaches away.",
    options: [
      {
        text: "INITIATE_NEXT_SECTOR.exe (Restart)",
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: "Your manual hack triggers a fail-safe. The room fills with neuro-toxin. SYSTEM OFFLINE.",
    options: [
      {
        text: "REBOOT_SYSTEM.exe (Restart)",
        nextText: -1
      }
    ]
  }
];