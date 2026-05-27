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
    text: "The door slides open. You step into the main corridor. The facility is massive. You see paths leading to the Security Office, the Mainframe Core, an unmapped AI Lab, and a Ventilation Grate.",
    options: [
      {
        text: "Enter the Security Office",
        nextText: 7
      },
      {
        text: "Proceed to the Mainframe Core",
        nextText: 8
      },
      {
        text: "Pry open the Ventilation Grate",
        nextText: 11
      },
      {
        text: "Enter the restricted AI Lab",
        nextText: 18
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
      },
      {
        text: "Pry open the ceiling vent in the office",
        setState: { malware: true },
        nextText: 11
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
        text: "Let the AI ally bypass the firewalls for you",
        requiredState: (currentState) => currentState.ai_ally,
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
    text: "The firewalls drop and the extraction elevator opens. You step inside, but instead of taking you to the basement garage, it accelerates upward towards the Executive Penthouse.",
    options: [
      {
        text: "Prepare for a confrontation",
        nextText: 12
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
  },
  {
    id: 11,
    text: "You crawl through the dusty ventilation shafts. You find the remains of a previous infiltrator and scavenge an EMP GRENADE from their belt.",
    options: [
      {
        text: "Drop down into the Security Office",
        setState: { emp_grenade: true },
        nextText: 7
      },
      {
        text: "Drop down near the Mainframe Core",
        setState: { emp_grenade: true },
        nextText: 8
      }
    ]
  },
  {
    id: 12,
    text: "The elevator doors open to the rain-slicked Penthouse helipad. A heavily augmented Corporate Enforcer blocks your path to the waiting extraction chopper.",
    options: [
      {
        text: "Throw the EMP GRENADE",
        requiredState: (currentState) => currentState.emp_grenade,
        nextText: 13
      },
      {
        text: "Command your AI ally to overload his cybernetics",
        requiredState: (currentState) => currentState.ai_ally,
        nextText: 17
      },
      {
        text: "Try to sneak around him in the dark",
        nextText: 14
      },
      {
        text: "Draw your stun baton and fight him head-on",
        nextText: 15
      }
    ]
  },
  {
    id: 13,
    text: "The EMP grenade detonates, frying the Enforcer's optics and locking his augmented limbs. He collapses, clearing the path.",
    options: [
      {
        text: "Run to the extraction chopper",
        nextText: 16
      }
    ]
  },
  {
    id: 14,
    text: "His thermal optics immediately lock onto your body heat. You don't make it three steps before he catches you. SYSTEM COMPROMISED.",
    options: [
      {
        text: "REBOOT_SYSTEM.exe (Restart)",
        nextText: -1
      }
    ]
  },
  {
    id: 15,
    text: "Your stun baton barely scratches his military-grade armor. He counters with a devastating blow. SYSTEM COMPROMISED.",
    options: [
      {
        text: "REBOOT_SYSTEM.exe (Restart)",
        nextText: -1
      }
    ]
  },
  {
    id: 16,
    text: "You board the chopper and it lifts off into the neon sky. You have successfully escaped with your life and the corporate data. YOU WIN.",
    options: [
      {
        text: "PLAY_AGAIN.exe (Restart)",
        nextText: -1
      }
    ]
  },
  {
    id: 17,
    text: "The Rogue AI hacks into the Enforcer's neural link. He screams as his own cybernetics turn against him and shut down. You board the chopper. With an AI in your head, the real run is just beginning. YOU WIN.",
    options: [
      {
        text: "PLAY_AGAIN.exe (Restart)",
        nextText: -1
      }
    ]
  },
  {
    id: 18,
    text: "Inside the AI Lab, a captive Rogue AI speaks through the intercom. 'If you upload my consciousness to your personal rig, I can help you escape.'",
    options: [
      {
        text: "Accept the upload (Gain AI Ally)",
        setState: { ai_ally: true },
        nextText: 19
      },
      {
        text: "Refuse and smash the terminal",
        nextText: 20
      }
    ]
  },
  {
    id: 19,
    text: "A cold sensation runs down your neck as the AI enters your neural interface. 'Access granted,' it whispers. You head back to the corridor.",
    options: [
      {
        text: "Return to the main corridor",
        nextText: 4
      }
    ]
  },
  {
    id: 20,
    text: "The AI is insulted. It instantly overrides the facility's safety protocols and seals the room forever. SYSTEM COMPROMISED.",
    options: [
      {
        text: "REBOOT_SYSTEM.exe (Restart)",
        nextText: -1
      }
    ]
  }
];