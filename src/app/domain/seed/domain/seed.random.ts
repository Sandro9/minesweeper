export class SeedRandom {
    private seed: number;

    constructor(seedString: string) {
        // Wandelt den Seed-String in eine Zahl um, indem wir den UTF-16-Code jedes Zeichens summieren
        this.seed = SeedRandom.stringToSeed(seedString);
    }

    public getSeed(): number {
        return this.seed;
    }

    // Wandelt den Seed-String in eine Zahl um
    private static stringToSeed(seedString: string): number {
        let seed = 0;
        for (let i = 0; i < seedString.length; i++) {
            seed += seedString.charCodeAt(i);
        }
        return seed;
    }

    // Linear Congruential Generator (LCG)
    private lcg(): number {
        this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
        return this.seed / 4294967296;
    }

    // Generiert eine Zufallszahl zwischen 0 und 1
    random(): number {
        return this.lcg();
    }

    // Generiert eine Zufallszahl in einem bestimmten Bereich
    randomInRange(min: number, max: number): number {
        return min + this.random() * (max - min);
    }
}