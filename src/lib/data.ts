import { Step, SpecialStep, SequenceItem } from './types';

export const PHASES = ["Command", "Movement", "Shooting", "Charge", "Fight"];

export const TURN_STEPS: Step[] = [
  { ph: -1, t: "Start of turn", r: "07.02, p29", me: ["Resolve any rules that trigger at the start of the turn."], op: ["Your opponent resolves rules that trigger at the start of their turn."] },
  { ph: 0, t: "Start of Command phase", r: "08.01, p30", me: ["Resolve any rules that trigger at the start of the Command phase."], op: ["Your opponent resolves start-of-phase rules."] },
  { ph: 0, t: "Gain Core CP", r: "08.02, p30", me: ["Both players gain 1 Command Point (CP). That includes you and your opponent."], op: ["Both players gain 1 CP, you included."], tp: "Core CP are ordinary Command Points. Spend them on stratagems." },
  { ph: 0, t: "Battle-shock", r: "08.03, 01.07, p9, p30", me: ["Make one battle-shock roll for every unit of yours that is currently battle-shocked, or is at or below half-strength.", "A battle-shock roll is a leadership roll: roll 2D6 and compare to the unit's Ld. Equal or higher succeeds.", "If a unit that was battle-shocked passes, it is no longer battle-shocked. If any other unit fails, that unit and every model in it becomes battle-shocked.", "Before rolling you can spend 1CP on Insane Bravery to auto-pass one roll (once per battle)."], op: ["Your opponent makes their battle-shock rolls.", "Remember: battle-shocked units have OC '-', cannot be targeted by stratagems, and cannot start actions."], tp: "At half-strength means the unit has exactly half of its starting strength. Below half-strength is fewer than half. A battle-shock roll is needed at either." },
  { ph: 0, t: "Command abilities", r: "08.04, p30", me: ["Resolve rules that trigger in the Command phase (other than start/end of phase, CP gain and battle-shock rolls).", "World Eaters: check your army, detachment and Leader abilities that say 'in your Command phase'."], op: ["Your opponent resolves their Command phase abilities."] },
  { ph: 0, t: "End of Command phase", r: "08.05, p30", me: ["Resolve end-of-phase rules, then consult your mission for anything it scores at this point."], op: ["Your opponent resolves end-of-phase rules and mission scoring."] },
  { ph: 1, t: "Start of Movement phase", r: "09.01, p32", me: ["Resolve any rules that trigger at the start of the Movement phase."], op: ["Your opponent resolves start-of-phase rules."] },
  { ph: 1, t: "Move units", r: "09.02-09.07, p32-33", me: ["Select your units one at a time. Every unit must be selected, including units in strategic reserves and units embarked in Transports, even if it just remains stationary.", "For each unit pick a move type: Remain stationary, Normal, Advance, Fall-back, Disembark or Ingress.", "Normal move: up to M, unit must be unengaged, and must finish unengaged.", "Advance move: roll one D6 and add it to M. Unit must be unengaged and finish unengaged. It then cannot declare a charge or start an action this turn.", "Fall-back move: only if engaged, up to M. If not battle-shocked you may use Ordered Retreat. Otherwise you must use Desperate Escape (hazard roll for each model, and you can move through enemy models). After a fall-back the unit cannot shoot, charge or start an action.", "Ingress move: units in strategic reserves arrive (from battle round 2). Set up wholly within 6\" of a battlefield edge and more than 8\" from enemy units.", "Every unit that moved must end in coherency, and no model may end partway through a terrain surface."], op: ["Your opponent moves their units.", "At the end of their Movement phase you may use Fire Overwatch (1CP) with an unengaged, non-Titanic unit, or Rapid Ingress (1CP, not in battle round 1) to bring a reserve unit on."], tp: "Coherency: every model within 2\" horizontally and 5\" vertically of another model in its unit, and within 9\" of every other model. Engagement range is 2\" horizontally and 5\" vertically." },
  { ph: 1, t: "End of Movement phase", r: "09.03, p32", me: ["Resolve end-of-phase rules."], op: ["Your opponent resolves end-of-phase rules. This is when Fire Overwatch and Rapid Ingress are used against them (1CP each)."] },
  { ph: 2, t: "Start of Shooting phase", r: "10.01, p34", me: ["Resolve any rules that trigger at the start of the Shooting phase."], op: ["Before they shoot you can use Smokescreen (1CP) on one of your SMOKE units."] },
  { ph: 2, t: "Shoot", r: "10.02-10.07, p34-35", me: ["Pick one of your units that is on the battlefield and has not shot yet. Then pick a shooting type:", "Normal shooting: unit is unengaged and did not Advance.", "Assault shooting: unit is unengaged, did Advance, and has [ASSAULT] weapons (only those can fire).", "Close-quarters shooting: unit is engaged, did not Advance, and has [CLOSE-QUARTERS] (or Pistol) weapons, or is a MONSTER/VEHICLE. Targets are engaged enemy units.", "Indirect shooting: unit is unengaged, did not Advance and has [INDIRECT FIRE] weapons.", "Resolve the attacks (see the Attack sequence in Quick reference), then pick your next unit.", "Explosives (1CP): a Grenades unit can throw grenades instead of the normal rules."], op: ["Your opponent shoots their units. You allocate saves and remove models."], tp: "MONSTER/VEHICLE models shooting in close quarters subtract 1 from hit rolls, unless it is a [CLOSE-QUARTERS] weapon aimed at an engaged unit." },
  { ph: 2, t: "End of Shooting phase", r: "10.03, p34", me: ["Resolve end-of-phase rules."], op: ["Your opponent resolves end-of-phase rules."] },
  { ph: 3, t: "Start of Charge phase", r: "11.01, p36", me: ["Resolve any rules that trigger at the start of the Charge phase."], op: ["Your opponent resolves start-of-phase rules."] },
  { ph: 3, t: "Charge", r: "11.02-11.04, p36-37", me: ["Declare a charge with one eligible unit. It must be on the battlefield, within 12\" of an enemy unit, unengaged, and must not have advanced or fallen back.", "Roll 2D6. The result is the maximum charge distance. A roll of 2 can never succeed.", "Pick one or more enemy units within 12\" and within that distance as charge targets, then move.", "Each model must end closer to a charge target, within 1\" of one if it can, and engaged with one if it can.", "The unit must finish engaged with every charge target and not engaged with any non-target enemy.", "If it succeeds it has Fights First until the end of the turn.", "Crushing Impact (1CP): a MONSTER/VEHICLE can ram an engaged enemy just after its charge move."], op: ["Your opponent charges. When they finish you can use Heroic Intervention (1CP) with an unengaged unit within 12\" of the enemy to charge back."], tp: "Try for all your charge targets together: you must be engaged with every one of them at the end." },
  { ph: 3, t: "End of Charge phase", r: "11.03, p36", me: ["Resolve end-of-phase rules."], op: ["Your opponent resolves end-of-phase rules. Heroic Intervention (1CP) is used now."] },
  { ph: 4, t: "Start of Fight phase", r: "12.01, p38", me: ["Resolve any rules that trigger at the start of the Fight phase."], op: ["Your opponent resolves start-of-phase rules."] },
  { ph: 4, t: "Pile in", r: "12.02-12.03, p38", me: ["Both players pile in, you first on your turn. Each unit makes at most one pile-in move.", "A unit is eligible if it is engaged, made a charge move this turn, or is making an overrun fight.", "Move up to 3\". Each model must end closer to the closest pile-in target and engaged with it if possible. Models already in base contact cannot move.", "The unit must end engaged, and models that started engaged must stay engaged with the same unit."], op: ["Your opponent piles in first, then you pile in with your eligible units."], tp: "Pile-in targets: every enemy unit you are engaged with, or if unengaged, enemy units within 5\"." },
  { ph: 4, t: "Fight", r: "12.04-12.06, p40-41", me: ["Fights First combats come first. Players alternate selecting Fights First units, starting with the active player.", "Then remaining combats, players alternating, starting with the player who moved on to that step.", "When a unit is picked, choose a fight type: Normal fight (engaged) or Overrun fight (unengaged, or became engaged during the step: one extra pile-in, then fight).", "Melee weapons: each model must select one melee weapon ([EXTRA ATTACKS] weapons are used in addition). Targets must be engaged with the weapon's model, and you cannot split across more targets than the weapon's A.", "If all your eligible units are more than 5\" from every enemy unit you may pass instead of selecting one."], op: ["Players alternate picking units to fight. You may use Counteroffensive (2CP) just after an enemy unit finishes its attacks: one of your eligible units gains Fights First and must fight next.", "Epic Challenge (1CP, either turn): a CHARACTER unit gives one model [PRECISION] for its melee weapons."], tp: "Charged units are Fights First. That makes the Fights First step very important for who strikes first." },
  { ph: 4, t: "Consolidate", r: "12.07-12.08, p42", me: ["Both players consolidate, you first on your turn. Each unit moves at most once, up to 3\".", "Pick a mode: Ongoing (if engaged, mandatory), Engaging (if within 3\" of an enemy, mandatory), or Objective (if within 3\" of an objective, mandatory).", "Engaging consolidation can leave your unit engaged with enemies that have not fought yet. Your opponent then picks each of those units and they fight immediately."], op: ["Your opponent consolidates, then you consolidate with your eligible units."] },
  { ph: 4, t: "End of Fight phase", r: "12.09, p42", me: ["Resolve end-of-phase rules."], op: ["Your opponent resolves end-of-phase rules."] },
  { ph: -1, t: "End of turn", r: "07.02, 03.03, p14, p29", me: ["Resolve rules that trigger at the end of the turn (not mission rules) first.", "Coherency check: for every unit not in coherency, remove models one at a time until it is. These models are destroyed but do not trigger destruction rules.", "Then consult your mission and score anything triggered at this point."], op: ["The same end-of-turn steps happen for your opponent's turn. Check your own units' coherency too, because you are also affected during their End of turn step."], tp: "The same player takes the first turn in every battle round. Your mission says who that is." }
];

export const SPECIAL_STEPS: Record<string, SpecialStep> = {
  rs: { ph: -1, t: "Start of battle round", r: "07.01, p28", me: ["Resolve rules that trigger at the start of the battle round.", "World Eaters: roll your Blessings of Khorne now, and pick Angron's Wrathful Presence first if he is on the table."], op: [], both: true },
  re: { ph: -1, t: "End of battle round", r: "07.03, p28", me: ["First resolve non-mission rules triggered at this point.", "Then both players consult their mission and score anything triggered now.", "If the battle isn't over, the next battle round begins."], op: [], both: true }
};

export const CORE_STRATAGEMS = [
  ["Command Re-roll", "1CP", "Any phase, just after you roll an advance, charge, damage, hazard, hit, save, wound roll, or a roll for number of attacks", "Re-roll that roll. If several dice were rolled together, re-roll one of them. Charge rolls are re-rolled in full."],
  ["Epic Challenge", "1CP", "Fight phase, just after a friendly CHARACTER unit is selected to fight", "One CHARACTER model's melee weapons gain [PRECISION] until end of phase."],
  ["Insane Bravery", "1CP", "Command phase battle-shock step, just before a battle-shock roll", "That roll automatically succeeds. Once per battle."],
  ["Explosives", "1CP", "Your Shooting phase", "Unengaged eligible EXPLOSIVES/GRENADES unit that did not advance: pick a model, pick an unengaged enemy unit within 8\" and visible, roll six D6: each 4+ is a mortal wound."],
  ["Crushing Impact", "1CP", "Your Charge phase, just after a MONSTER/VEHICLE unit ends a charge move", "Pick an engaged enemy unit and one of your engaged models. Roll D6 equal to its T: each 1 is a mortal wound to your unit, each 5+ one to theirs (max 6)."],
  ["Rapid Ingress", "1CP", "End of your opponent's Movement phase (not round 1)", "A friendly unit in strategic reserves (not AIRCRAFT) makes an ingress move."],
  ["Fire Overwatch", "1CP", "End of your opponent's Movement phase", "An unengaged non-TITANIC unit snap shoots one visible enemy within 24\". Attacks hit only on an unmodified 6. No hit re-rolls."],
  ["Smokescreen", "1CP", "Start of your opponent's Shooting phase", "One SMOKE unit has the benefit of cover until end of phase against attacks that target it or are blocked by it."],
  ["Heroic Intervention", "1CP", "End of your opponent's Charge phase", "An unengaged unit within 12\" of an enemy resolves a charge. Choose Leap to Defend (target only enemies that charged this phase) or Into the Fray (+1CP: a charge roll over 6 counts as 6, and enemies within 6\" can be targeted)."],
  ["Counteroffensive", "2CP", "Fight step of your opponent's Fight phase, just after an enemy unit resolved its attacks", "One friendly unit eligible to fight gains Fights First until end of phase and must fight next."]
];

export const WEAPON_ABILITIES = [
  ["[ANTI-X Y+]", "If the target has keyword X, an unmodified wound roll of Y+ is a critical wound."],
  ["[ASSAULT]", "The unit can use assault shooting (shoot after advancing, using only [ASSAULT] weapons)."],
  ["[BLAST] / [BLAST X]", "Add 1 (or X) attack dice for every five models in the target unit, rounded down."],
  ["[CLEAVE X]", "If you pick only one target for all of this weapon's attacks, add X attack dice for every five models in the target unit, rounded down."],
  ["[CLOSE-QUARTERS]", "The unit can shoot using close-quarters shooting. [PISTOL] works the same way."],
  ["[DEVASTATING WOUNDS]", "A critical wound ends the attack and the target suffers mortal wounds equal to the weapon's D, after normal damage. Each critical wound can hurt only one model."],
  ["[EXTRA ATTACKS]", "Used in addition to the model's other melee weapon. You must select all [EXTRA ATTACKS] weapons plus one other melee weapon where possible."],
  ["[HAZARDOUS]", "After the unit has resolved its attacks, make one hazard roll per [HAZARDOUS] weapon selected."],
  ["[HEAVY]", "+1 to hit in your Shooting phase if the unit is unengaged, was not set up this turn, and no model moved more than 3\"."],
  ["[IGNORES COVER]", "The target cannot have the benefit of cover against these attacks."],
  ["[INDIRECT FIRE]", "The unit can use indirect shooting at units that are not visible."],
  ["[LANCE]", "+1 to wound if the attacking unit made a charge move this turn."],
  ["[LETHAL HITS]", "You can choose for a critical hit to automatically wound (no wound roll, so it cannot be a critical wound)."],
  ["[MELTA X]", "Add X to the weapon's D if the target was within half range."],
  ["[ONE SHOT]", "Can only be selected once per battle."],
  ["[PRECISION]", "The active player can choose a visible CHARACTER group as the current allocation group."],
  ["[PSYCHIC]", "You can ignore modifiers to BS/WS and to the hit roll."],
  ["[RAPID FIRE X]", "Add X attack dice if the target was within half range."],
  ["[SUSTAINED HITS X]", "A critical hit scores X additional hits."],
  ["[TORRENT]", "Attacks automatically hit."],
  ["[TWIN-LINKED]", "You can re-roll the wound roll."],
  ["Deadly Demise X", "When a model is destroyed, roll D6: on a 6 each unit within 6\" suffers X mortal wounds."],
  ["Deep Strike", "Can ingress more than 8\" horizontally from all enemy units, even in the enemy deployment zone."],
  ["Feel No Pain X+", "Each time the model would lose a wound, roll D6: on X+ the wound is not lost."],
  ["Fights First", "A unit where every model has this is a Fights First unit."],
  ["Firing Deck X", "In your Shooting phase the Transport can fire X embarked models' ranged weapons as its own. Embarked units can't shoot that turn."],
  ["Hover", "No -2\" when taking to the skies."],
  ["Infiltrators", "Deploy more than 8\" from the enemy deployment zone and all enemy units."],
  ["Leader / Support", "Can lead a listed bodyguard unit to form an attached unit."],
  ["Lone Operative (X\")", "Not visible to enemy models unless within X\" (12\" by default), and cannot be targeted by [INDIRECT FIRE] unless within X\"."],
  ["Scouts X\"", "Before the battle, make a scout move of up to X\" in your deployment zone (more than 8\" from enemies), or arrive from reserves wholly in your zone."],
  ["Stealth", "Ranged attacks against the unit are made as if it had the benefit of cover."],
  ["Super-heavy Walker", "Can move through models (not TITANIC) and terrain up to 4\" high. Optionally gain MOBILE, but roll D6 after: on a 1 the unit is battle-shocked."]
];

export const KEY_TERMS = [
  ["Engagement range", "2\" horizontally and 5\" vertically. Units with models within each other's range are engaged."],
  ["Coherency", "Every model within 2\" horiz / 5\" vert of another model in the unit, and within 9\" horiz / 5\" vert of every other model."],
  ["Battle-shocked", "OC becomes '-', cannot be targeted by stratagems, cannot start actions."],
  ["Starting strength", "Models in the unit at the start of battle round 1. For an attached unit it includes the Leader."],
  ["At half-strength", "Starting strength 1: wounds are half of W. Otherwise models remaining equal half the starting strength."],
  ["Below half-strength", "Fewer than half of those wounds or models remain."],
  ["Mortal wounds", "Each is 1 damage on a model. Wounded non-CHARACTER models are picked first."],
  ["Hazard roll", "D6: on 1-2 the unit suffers 1 mortal wound (3 if every model is MONSTER/VEHICLE)."],
  ["Benefit of cover", "Worsen the attack's BS by 1. INFANTRY/BEASTS/SWARM in a terrain area have it, as do units not fully visible due to terrain."],
  ["Hidden", "INFANTRY/BEASTS/SWARM in a terrain area with dense terrain that did not make ranged attacks this or last turn. Only visible within 15\"."],
  ["Level of control", "Add the OC of your models within range of an objective. Highest controls it; a tie means nobody (unless secured)."],
  ["Active player", "The player taking their turn. They roll attacks and make hit and wound rolls."]
];

export const ATTACK_SEQUENCE = [
  ["1. Hit rolls", "Roll one D6 per attack dice. An unmodified 1 fails, an unmodified 6 is a critical hit. Otherwise it hits on BS/WS or better."],
  ["2. Wound rolls", "One D6 per hit. S at least double T: 2+. S greater: 3+. Equal: 4+. S less: 5+. S half T or less: 6+. Unmodified 6 is a critical wound; unmodified 1 fails."],
  ["3. Save rolls", "The defender groups models (CHARACTERs separately, wounded non-CHARACTER groups first) and rolls one D6 per wound."],
  ["4. Inflict damage", "Lowest results are allocated first. An attack fails if the roll meets the invulnerable save, or if the roll modified by AP meets the Sv. Otherwise the model loses D wounds. Excess attacks are lost."]
];

export const TIPS_GENERAL: Record<string, { m?: string[]; o?: string[] }> = {
  "Start of battle round": { m: ["Faction rules that act at the start of the battle round happen here, before either player's turn. Check your army rules and any Leader abilities now."] },
  "Gain Core CP": { m: ["Both players gain the same CP each turn, so CP advantage comes from spending it better. Decide before the turn which stratagems you actually want."], o: ["Keep CP in hand for their turn if you want Fire Overwatch, Heroic Intervention or Command Re-roll (1CP each). Counteroffensive costs 2CP."] },
  "Battle-shock": { m: ["A unit at or below half-strength must roll every turn, so a badly hurt unit keeps being tested. Pull objective-holding units out of the fight before they drop to half.", "Battle-shocked units have OC '-' and cannot be targeted by your stratagems. Save Insane Bravery (once per battle) for a unit that is holding an objective.", "A battle-shocked unit only recovers by passing a later battle-shock roll."] },
  "Command abilities": { m: ["Read each datasheet for abilities that trigger in your Command phase before you start moving."] },
  "Move units": { m: ["Advancing adds D6 to the move but the unit then cannot charge or start an action, and can only shoot [ASSAULT] weapons. Don't advance units you want to charge with.", "Falling back is costly: the unit cannot shoot, charge or start an action, and a battle-shocked unit must use Desperate Escape (a hazard roll per model, a mortal wound on each 1-2).", "Strategic reserves cannot arrive before round 2, must enter within 6\" of a battlefield edge and more than 8\" from enemies, and are destroyed if still off the table at the end of round 3. Keep the units you need early on the table.", "Every unit must end its move in coherency, or models are removed at your End of turn step.", "Stay out of the 12\" charge range of units you don't want to fight. INFANTRY/BEASTS/SWARM in a terrain area with dense terrain are hidden: they can only be seen within 15\" unless they shot this or last turn."], o: ["Check their final positions: which of your units are within 12\" of a threat? Fire Overwatch (hits only on unmodified 6s) and Rapid Ingress (not in round 1) are used at the end of their Movement phase."] },
  "Shoot": { m: ["Pick the shooting type first: Normal needs unengaged and no Advance, Assault needs an Advance and [ASSAULT] weapons, Close-quarters lets an engaged unit shoot engaged enemies.", "Rapid Fire and Melta only work within half range, so close the distance with units that carry them.", "Cover worsens the attacker's BS by 1. [IGNORES COVER] weapons and shooting at units outside terrain matter.", "[BLAST] and [CLEAVE] improve with the size of the target unit, so aim them at the biggest squads.", "Taking a unit to half-strength or below forces it to roll battle-shock in its next Command phase and can strip its OC."], o: ["Smokescreen (1CP) at the start of their Shooting phase gives a SMOKE unit cover. Use it on the unit about to take the hardest volley."] },
  "Charge": { m: ["You must be within 12\" and roll 2D6 for the distance; a roll of 2 always fails. Measure before you declare.", "Every charge target must end engaged and you cannot end engaged with a non-target, so charging two units makes it harder. Fewer targets is easier.", "A unit that charges has Fights First until the end of the turn, which matters as much as reaching combat.", "[LANCE] weapons get +1 to wound after a charge move.", "Consider what your charging unit exposes to Heroic Intervention at the end of the Charge phase."], o: ["Heroic Intervention (1CP) at the end of their Charge phase: an unengaged unit within 12\" of an enemy charges. Leap to Defend lets it hit units that just charged."] },
  "Pile in": { m: ["Pile-in is up to 3\" and must end closer and engaged. Use it to bring more models into combat."] },
  "Fight": { m: ["Fights First units fight before everyone else, starting with the active player. Make sure your most dangerous unit charged this turn.", "Destroying a unit before it fights removes its attacks, so pick the units that must die first.", "Overrun fights let units that became engaged during the step make one more pile-in and fight.", "Epic Challenge (1CP) gives a CHARACTER model [PRECISION] to snipe a Leader inside an attached unit."], o: ["Counteroffensive (2CP) gives one of your units Fights First and makes it fight next, just after an enemy unit finishes its attacks."] },
  "Consolidate": { m: ["Objective consolidation lets a unit within 3\" of an objective step onto it.", "Engaging consolidation can leave you engaged with enemy units that haven't fought yet, and they fight your unit immediately. Only do it if you want that fight."] },
  "End of turn": { m: ["Check coherency before you finish: models out of coherency are removed without triggering destruction rules. Then score your mission."] }
};

export const TIPS_WORLD_EATERS: Record<string, { m?: string[]; o?: string[] }> = {
  "Start of battle round": { m: ["Blessings of Khorne: roll eight D6 and activate up to two blessings, each once per round. 'Double X+' means two dice that are both X or higher.", "Unbridled Bloodlust (any double) is the easiest. Martial Excellence (double 4+), Warp Blades (double 5+) and Decapitating Strikes (double 6+) are the damage blessings.", "Angron: pick Wrathful Presence before you roll. Blood God's Favour lets you re-roll up to 6 of the dice.", "A Khorne Lord of Skulls on the table adds a ninth die (Idol of Blessed Blood)."] },
  "Battle-shock": { m: ["Most World Eaters have Ld 6+, which passes on 2D6 about 72% of the time. Jakhals, Goremongers and Chaos Spawn are Ld 7+ (about 58%) and Angron is Ld 5+ (about 83%).", "20-model Berzerkers hit half-strength at 10 models, and from then on they roll every turn."] },
  "Command abilities": { m: ["Slaughterbound: Rage Eternal returns a destroyed bodyguard model to the unit it leads.", "Cult of Blood: pick your Idol of Khorne. Khorne Daemonkin: spend Blood Tithe points. Vessels of Wrath: use Archslaughterer here if you took it."] },
  "Move units": { m: ["Get Berzerkers there intact: a Rhino carries 12 and a Land Raider 14 (Possessed and Terminators count double). The Land Raider's Assault Ramp lets passengers charge after disembarking following a Normal move.", "Lord Invocatus gives the led unit Deep Strike and lets it move through models and terrain. A Lord on Juggernaut makes the led unit Move 10\". Both help Berzerkers reach the charge.", "Terminators, Angron and Exalted Eightbound have Deep Strike. Hold them in reserves and arrive from round 2, more than 8\" from enemies.", "Eightbound and Lord Invocatus have Scouts 6\" for a free early move, and Goremongers can Infiltrate.", "Berzerkers move 8\" and Jakhals 7\", so plan your charge distance before you move."], o: ["Goremongers: Loping Speed lets them make a Normal move of up to D6\" when an enemy ends a move within 8\". Rhino: Meet Any Challenge lets passengers disembark. Defiler: Unleash Wrath lets it shoot or charge a unit that arrived within 12\"."] },
  "Shoot": { m: ["World Eaters win in melee, so use shooting to soften targets you plan to charge. Your guns are the Defiler, Heldrake, Land Raider and Lord of Skulls. A Rhino's Firing Deck 2 lets two passengers shoot.", "Terminators' Bloody Fury lets them re-roll hit rolls against the closest eligible target.", "Don't Advance units you want to charge. Only [ASSAULT] weapons like the Goremongers' blood harpoon fire after an Advance.", "Heldrake: Airborne Predator gives +1 to hit against units that can Fly, and the baleflamer has Torrent so it automatically hits."], o: ["Berzerkers: Blood Surge lets them surge D6+2\" toward the enemy after losing a model to shooting. Eightbound and Exalted Eightbound: Brazen Fury surges D6\"."] },
  "Charge": { m: ["Unbridled Bloodlust gives +1 to charge rolls when the distance is tight.", "Berzerkers get +1 Strength after charging (Murderous Charge), and Berzerker Warband gives all your melee +1 Attack.", "Terminators can re-roll the charge roll with Bloody Fury, but the charge must end engaged with the closest target.", "Lord Invocatus: Bloody Stampede deals mortal wounds when the led unit ends a charge. Daemon Prince: Devastating Assault after charging.", "Khârn: at the end of your Charge phase an unengaged unit he leads takes a leadership roll or loses a bodyguard model. Charging first avoids the risk.", "Angron's Driven by Ultimate Rage gives nearby World Eaters re-rolls of 1s to hit and wound in melee."] },
  "Fight": { m: ["Charged units have Fights First, so send your best units in on the charge so they strike before the enemy.", "Slaughterbound's Possessed Lord (once per battle) gives +3 Attacks and Devastating Wounds at the start of the Fight phase. Save it for a big target.", "Total Carnage lets models killed in melee fight back on a 4+. Helbrute's Frenzy lets it fight again after being attacked.", "Lord on Juggernaut: Crush All Who Stand Before Us lets models within 3\" fight.", "Brazen Engines: Terror of Khorne forces an engaged enemy to roll battle-shock at -1. Butchers of Khorne gives Terminators an extra blessing.", "Master of Executions re-rolls hit and wound against Characters, which pairs well with Epic Challenge (1CP)."] },
  "Consolidate": { m: ["Rage-fuelled Invigoration (blessing) makes pile-in and consolidation moves up to 6\" instead of 3\", enough to reach objectives or new targets.", "Jakhals: Objective Ravaged keeps an objective yours after they leave it, until the enemy's level of control is higher at the end of a phase."] },
  "End of turn": { m: ["Large Berzerker and Jakhal units spread out easily during pile-in and consolidation. Check coherency before you end the turn."] }
};

export const TIPS_CUSTODES: Record<string, { m?: string[]; o?: string[] }> = {
  "Start of battle round": { m: ["Martial Ka'tah: At the start of each battle round, select one Ka'tah stance for your army. Each stance provides a different bonus.", "Ka'tah of the Conservai: Re-roll hit rolls of 1 in melee - good for grinding combats.", "Ka'tah of the Rendax: +1 to wound rolls against MONSTERS and VEHICLES - use against heavy targets.", "Ka'tah of the Dacatarai: +1 Attack for CUSTODES INFANTRY - best for maximum damage output.", "Trajann Valoris lets you use two Ka'tah stances at once if he's your Warlord."] },
  "Battle-shock": { m: ["Custodes have excellent Leadership (Ld 6+ on most units), giving about 72% pass rate on 2D6.", "Custodian Guard and Wardens are Ld 6+. Allarus Terminators and Vertus Praetors are also Ld 6+.", "Sisters of Silence are Ld 7+ (58% pass rate) - keep them supported.", "Your small elite units hit half-strength quickly. A 3-model Allarus squad is at half-strength at 1 model remaining."] },
  "Command abilities": { m: ["Shield-Captain abilities trigger in the Command phase. Check your Warlord Traits.", "Vexilla Magnifica (4+ invulnerable aura) is always active but remember to keep units in range.", "Constantin Valoris: Emperor's Auspice gives a 4+ Feel No Pain against mortal wounds to nearby units."] },
  "Move units": { m: ["Custodian Guard move 6\", Allarus Terminators 5\", Vertus Praetors 12\" (FLY).", "Vertus Praetors with their 12\" move and FLY are your fastest units - use them for objectives and flanking.", "Allarus Terminators have Deep Strike - arrive from round 2, more than 8\" from enemies.", "Venetari have Deep Strike and FLY - excellent for dropping onto objectives.", "Teleport Homer (if available): Allows Terminators to arrive from reserves more than 3\" from enemies instead of 8\".", "Sisters of Silence move 6\" and can Infiltrate with Prosecutors - deploy them to screen or grab early objectives."], o: ["Your opponent will try to screen out your Deep Strike. Look for gaps in their deployment zone."] },
  "Shoot": { m: ["Custodes shooting is limited but potent. Guardian Spears are Assault so you can Advance and shoot.", "Vertus Praetors' hurricane bolters are Rapid Fire 3 - devastating at close range.", "Allarus Terminators' castellan axes have shooting profiles - don't forget them.", "Sagittarum Guard are your dedicated shooting unit with their Adrastus bolt calivers.", "Telemon Heavy Dreadnought is your heavy fire support - Iliastus accelerator culverin is excellent anti-infantry."], o: ["Use your 4++ invulnerable saves to weather enemy shooting. Position Vexilla for the aura."] },
  "Charge": { m: ["Ka'tah of the Dacatarai gives +1 Attack - declare it at the start of the round if you plan to charge.", "Vertus Praetors can charge after Advancing thanks to their hurricane bolters being Assault.", "Allarus Terminators arriving from Deep Strike want to charge immediately - they're wasted standing still.", "Trajann Valoris: Moment Shackle can let you fight twice - save it for a crucial combat.", "Custodes are elite - every model matters. Don't charge into fights you can't win."] },
  "Fight": { m: ["Guardian Spears are S7 AP-2 D2 with [LANCE] - +1 to wound on the charge.", "Sentinel Blades are S6 AP-2 D1 but give +1 Attack - better against hordes.", "Castellan Axes (Allarus) are S9 AP-2 D3 - excellent against heavy infantry and light vehicles.", "Vertus Praetors' interceptor lances are S8 AP-2 D2 with [LANCE] - devastating on the charge.", "Trajann's Watcher's Axe is S10 AP-3 D3 - he can carve through almost anything.", "Sisters of Silence have [ANTI-PSYKER 4+] - use them to hunt enemy psykers."], o: ["With 2+ saves and 4++ invulnerable, Custodes can tank hits. But you have few models - don't get bogged down."] },
  "Consolidate": { m: ["Your small unit sizes mean consolidation is crucial for objective control.", "Consolidate onto objectives whenever possible - your high OC (2 per Custodian) makes you hard to shift.", "Be careful consolidating into new combats - you can't afford to lose models in unfavorable fights."] },
  "End of turn": { m: ["Check coherency - with 2-3 model units, one bad pile-in can break coherency.", "Score your mission objectives. Custodes excel at holding objectives with their high OC and durability.", "Remember: Custodes win by playing the mission, not by tabling the opponent. Prioritize objectives."] }
};

export const SETUP_STEPS = [
  ["Generate your mission", "Use the mission deck. It sets the battlefield size, terrain guidance, deployment map, army size, who takes the first turn, how many battle rounds are played (usually five) and how to win.", "Intro p5"],
  ["Create the battlefield", "Place terrain features inside terrain areas (a mat boundary, a single feature, or several features that mark out an area). Features are Exposed, Light or Dense. Leave room for MONSTER/VEHICLE models to move around dense terrain.", "13.01-13.05, p46"],
  ["Muster armies", "Build your army to the mission's points limit. For each Leader or Support unit, choose one bodyguard unit it will lead; each bodyguard unit can have one Leader and one Support unit.", "19.01, p66"],
  ["Declare battle formations", "Units can start embarked in a Transport with enough capacity. You can also place units in strategic reserves, as long as their combined points are no more than 50% of your points limit. Reserves arrive by ingress move from round 2, and any still off the table at the end of round 3 are destroyed.", "18.01, 20.01-20.04, p64, p68-69"],
  ["Deploy your armies", "Use the mission's deployment map. INFILTRATORS can deploy more than 8\" from the enemy deployment zone and all enemy units.", "24.20, p82"],
  ["Resolve pre-battle abilities", "Scouts units make their scout move (up to X\", wholly in your deployment zone beforehand, and more than 8\" from enemy units afterwards). Units cannot embark after a scout move.", "24.31-24.32, p84, p88"],
  ["Begin the battle", "Battle round 1 starts. Switch to the Guide tab and press Next step.", "07.01, p28"]
];

export function generateSequence(): SequenceItem[] {
  const seq: SequenceItem[] = [{ k: 'rs' }];
  for (let t = 0; t < 2; t++) {
    TURN_STEPS.forEach((_, i) => seq.push({ k: 't', t, i }));
  }
  seq.push({ k: 're' });
  return seq;
}

export function getTipsFor(stepTitle: string, isMyTurn: boolean, faction: 'g' | 'we' | 'ac'): Array<[string, string[]]> {
  const key = isMyTurn ? 'm' : 'o';
  const out: Array<[string, string[]]> = [];
  
  const generalTips = TIPS_GENERAL[stepTitle];
  if (generalTips && generalTips[key]) {
    out.push(["Strategy tips", generalTips[key]!]);
  }
  
  if (faction === 'we') {
    const weTips = TIPS_WORLD_EATERS[stepTitle];
    if (weTips && weTips[key]) {
      out.push(["World Eaters tips", weTips[key]!]);
    }
  }
  
  if (faction === 'ac') {
    const acTips = TIPS_CUSTODES[stepTitle];
    if (acTips && acTips[key]) {
      out.push(["Adeptus Custodes tips", acTips[key]!]);
    }
  }
  
  return out;
}
