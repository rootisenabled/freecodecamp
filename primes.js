function isPrime(num) {
    for (let i = 2; i < num; i++) {
        if (num % i == 0)
            return false;
    }
    return num > 1;
}

function explode(num) {
    const primes = [];

    if (isPrime(num)) {
        primes.push(num);
    }

    for (let i = 2; i <= num; i++) {
        while (num % i === 0) {
            if (num % i == 0) {
                primes.push(i);
                num = num / i;
            }
        }
    }
    return primes;
}

function primeRange(start, end) {
	const primes = [];

	for (let i = start; i <= end; i++) {
		if (isPrime(i)) {
			primes.push(i);
		}	
	}

	return primes;
}