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
      },
      {
        text: "Inspect the glowing terminal in the corner",
        nextText: 6
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
      },
      {
        text: "Take the keycard and inspect the glowing terminal",
        setState: { keycard: true },
        nextText: 6
      }
    ]
  },
  {
    id: 3,
    text: "The door is locked with a biometric scanner. There is an emergency override slot.",
    options: [
      {
        text: "Swipe the SECURITY KEYCARD",
        requiredState: (currentState) => currentState.keycard,
        nextText: 4
      },
      {
        text: "Try to hack the door manually",
        nextText: 5
      }
    ]
  },
  {
    id: 4,
    text: "The door slides open. You step into the main corridor. To your left is the Security Office, to your right is the Mainframe Core.",
    options: [
      {
        text: "Enter the Security Office",
        nextText: 7
      },
      {
        text: "Proceed to the Mainframe Core",
        nextText: 8
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
  },
  {
    id: 6,
    text: "The terminal displays a prompt for an Admin Override. You don't know the password.",
    options: [
      {
        text: "Attempt a brute-force attack",
        nextText: 5
      },
      {
        text: "Step away and search the server racks instead",
        nextText: 2
      }
    ]
  },
  {
    id: 7,
    text: "The Security Office is empty, but a terminal is left logged in. You download a MALWARE DECRYPTOR onto a flash drive.",
    options: [
      {
        text: "Take the drive and head to the Mainframe Core",
        setState: { malware: true },
        nextText: 8
      }
    ]
  },
  {
    id: 8,
    text: "You arrive at the Mainframe Core. A massive neural-net processor hums before you. The extraction elevator is beyond the final firewalls.",
    options: [
      {
        text: "Inject the MALWARE DECRYPTOR into the core port",
        requiredState: (currentState) => currentState.malware,
        nextText: 9
      },
      {
        text: "Try to bypass the final firewalls using brute force",
        nextText: 10
      }
    ]
  },
  {
    id: 9,
    text: "The malware successfully disables the firewalls and unlocks the extraction elevator. You step inside just as corporate security breaches the floor. You escaped.",
    options: [
      {
        text: "INITIATE_ESCAPE.exe (Victory - Play Again)",
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: "The mainframe detects your unauthorized entry attempt. Security drones drop from the ceiling and surround you. SYSTEM COMPROMISED.",
    options: [
      {
        text: "REBOOT_SYSTEM.exe (Restart)",
        nextText: -1
      }
    ]
  }
];