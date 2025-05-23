function minEnergy(
    start: number,
    shops: number[],
    stations: number[],
    target: number
): number {
    type State = {
        position: number;
        energy: number;
        been: number[];
    };

    let check: State[] = [];
    let visited: string[] = [];

    check.push({ position: start, energy: 0, been: [] });

    while (check.length > 0) {
        let current = check.shift()!;
        let pos = current.position;
        let en = current.energy;
        let been = [...current.been];

        if (shops.includes(pos) && !been.includes(pos)) {
            been.push(pos);
        }

        if (
            been.length === shops.length &&
            shops.every((s) => been.includes(s)) &&
            pos === target
        ) {
            return en;
        }

        let key = pos + "-" + been.sort((a, b) => a - b).join(",");
        visited.push(key);

        if (pos > 0) {
            check.push({ position: pos - 1, energy: en + 1, been: [...been] });
        }

        if (pos < 1000) {
            check.push({ position: pos + 1, energy: en + 1, been: [...been] });
        }

        if (stations.includes(pos)) {
            for (let to of stations) {
                if (to !== pos) {
                    check.push({ position: to, energy: en, been: [...been] });
                }
            }
        }
    }

    return 0;
}

console.log(minEnergy(2, [4, 9], [3, 6, 8], 7));
