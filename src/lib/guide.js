import { profile } from '../data/portfolio';

const action = (label, type, value) => ({ label, type, value });

export function getGuideReply(input) {
  const question = input.toLowerCase().trim();
  if (/\b(monday|m\.o\.n\.d\.a\.y|assistant)\b/.test(question))
    return {
      text: 'M.O.N.D.A.Y. is Isaiah’s C#/.NET personal assistant. The project combines conversation, local tools, a web workspace, and a VS Code companion. I’m the portfolio guide: I use a small set of curated answers to help you explore. A live assistant connection is planned.',
      actions: [action('Explore M.O.N.D.A.Y.', 'project', 'monday')],
    };
  if (/\b(toolkit|ktd|diagnostic|repair|powershell)\b/.test(question))
    return {
      text: 'KTD Technician Toolkit starts with 20+ automated Windows diagnostic checks. Isaiah is growing it into a repair-shop workspace with intake, tickets, inventory, invoicing, staff roles, and licensing. The wider shop workflow is still in development.',
      actions: [action('Explore the toolkit', 'project', 'toolkit')],
    };
  if (/\b(tcg|card|cards|everbound|shop)\b/.test(question))
    return {
      text: 'The TCG project brings together a shop simulation and an original card-game rules engine. Inventory, pricing, and store progression sit alongside turn flow, combat, and deck validation, with separate modules for the store and game systems.',
      actions: [action('Explore the TCG project', 'project', 'tcg')],
    };
  if (
    /\b(contact|email|hire|hiring|available|availability|remote|work together)\b/.test(
      question,
    )
  )
    return {
      text: `Isaiah is open to conversations about IT support, implementation, and development opportunities, including remote work. The best way to reach him is ${profile.email}.`,
      actions: [action('Go to contact', 'section', 'contact')],
    };
  if (/\b(resume|résumé|cv|download)\b/.test(question))
    return {
      text: 'The current résumé covers Isaiah’s IT experience, technical skills, certifications, and development projects. You can download the PDF here.',
      actions: [action('Download résumé', 'resume', '')],
    };
  if (
    /\b(experience|career|job|jobs|work history|prologic|storage)\b/.test(
      question,
    )
  )
    return {
      text: 'Isaiah’s experience spans help desk support, restaurant technology, enterprise storage implementation, and Windows deployment for State of Georgia agencies. He currently works as a Computer Technician at ProLogic ITS.',
      actions: [action('Read the quest log', 'section', 'journey')],
    };
  if (
    /\b(skill|skills|stack|language|languages|react|python)\b/.test(question) ||
    /c\+\+|c#|\.net/.test(question)
  )
    return {
      text: 'His work crosses three branches: systems and support, software and automation, and game development. Tools include Windows, MDT/SCCM, C#/.NET, PowerShell, Python, React, and C++/Unreal. The skill tree connects each skill to actual work.',
      actions: [action('Explore the skill tree', 'section', 'skills')],
    };
  if (/\b(game|games|play|arcade|rune|quest)\b/.test(question))
    return {
      text: 'Up for a side quest? Rune Relay is a short memory game. Watch the runes light up, then repeat the sequence. Complete five rounds to earn the Rune Keeper badge.',
      actions: [action('Play Rune Relay', 'arcade', '')],
    };
  if (/\b(project|projects|work|build|builds|built|showcase)\b/.test(question))
    return {
      text: 'Start with the three featured builds: M.O.N.D.A.Y., KTD Technician Toolkit, and the TCG Shop & Rules Engine. The workbench also includes smaller React projects and an Unreal Engine prototype.',
      actions: [
        action('See the workbench', 'section', 'work'),
        action('Explore M.O.N.D.A.Y.', 'project', 'monday'),
      ],
    };
  if (/\b(who|about|isaiah|story|yourself)\b/.test(question))
    return {
      text: 'Isaiah King is an IT professional and self-taught developer based in the Atlanta area. He likes turning real problems into useful tools, and he’s building toward a future in game development.',
      actions: [action('Meet the builder', 'section', 'about')],
    };
  if (
    /\b(certification|certifications|certificate|education|google|ibm)\b/.test(
      question,
    )
  )
    return {
      text: 'The included résumé lists the Google IT Support Certificate and CompTIA ITF+. It lists the IBM Full Stack Developer Professional Certificate as in progress.',
      actions: [action('See knowledge collected', 'section', 'journey')],
    };
  if (/\b(hello|hi|hey|help|start)\b/.test(question))
    return {
      text: 'Welcome to the realm. I can point you toward projects, skills, work experience, the résumé, or a quick side quest. What would you like to explore?',
      actions: [
        action('Explore projects', 'section', 'work'),
        action('Play Rune Relay', 'arcade', ''),
      ],
    };
  return {
    text: 'That’s outside my portfolio notes. I can help with Isaiah’s projects, skills, experience, résumé, and contact details. For a deeper conversation, reach out to Isaiah directly.',
    actions: [
      action('Explore projects', 'section', 'work'),
      action('Contact Isaiah', 'section', 'contact'),
    ],
  };
}
