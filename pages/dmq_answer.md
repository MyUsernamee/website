# Daily Question Answer

Today's question is about volumes of revolution. Here are the functions in question.

\begin{align*}
f(x) = \frac{cos(x)}{x^2+1} && g(x) = -cos (x)
\end{align*}

First we need to find the interesction of these two function. That means we need to find where they equal.

\begin{align*}
\frac{cos(x)}{x^2+1} &= -cos(x) \\
\frac{cos(x)}{x^2+1} + cos(x) &= 0 \\
\end{align*}

We know that $cos(x) = 0$ at $x = \pi/2, 3\pi/2, \dots$ and the same for the negatives.
$x^2 + 1$ never equals zero on $(-\infty, \infty)$. So for the above function we can find that:

\begin{align*}
x &= -\pi/2, \pi/2 \\
\end{align*}

Since we do not care about further intersections, we only consider those two. The function is also even because cosine and $\frac{1}{x^2+1}$ are even, so we can use the formula $\int_{-a}^{0} f(x) dx = \int_{0}^a f(x) dx$. Or $\int_{-a}^a f(x) dx = 2\int_0^a f(x) dx$

\begin{align*}
A &= 2\int_{0}^a \frac{cos(x)}{x^2+1} - (-cos(x)) dx \\
&= 2\int_{0}^a \frac{cos(x)}{x^2+1} + cos(x) dx \\
&= 2\int_{0}^a \frac{cos(x) + (x^2+1)cos(x)}{x^2+1} dx \\
&= 2\int_{0}^a \frac{cos(x)(1+ (x^2+1))}{x^2+1} dx \\
&= 2\int_{0}^a cos(x)\frac{x^2+2}{x^2+1} dx \\
&= 2\int_{0}^a cos(x)\frac{x^2+2}{(x+1)(x-1)} dx \\
\end{align*}



