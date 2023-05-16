MAX_ITER = 80
MANDELBROT_EXPONENT = 2

def multibrot(c, exponent):
    z = 0 if exponent > 0 else c
    n = 0
    while abs(z) <= 2 and n < MAX_ITER:
        z = z**exponent + c
        n += 1
    return n

if __name__ == "__main__":
    for a in range(-10, 10, 5):
        for b in range(-10, 10, 5):
            c = complex(a / 10, b / 10)
            print(c, multibrot(c, 2))