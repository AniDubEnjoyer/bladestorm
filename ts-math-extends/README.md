# Math Struct Library

TypeScript classes with polymorphic methods that:

- Return the child's TypeScript type.
- Use the child's constructor.

If constructor is overridden, arguments must not change.

# Examples

- Type of b is Vec3.

        class Color extends Vec3 {}
        const a = new Vec3(0, 0, 0);
        const b = a.plus(new Color(0, 0, 0));

- Types of white and black are both Color.

        class Color extends Vec3 {}
        const red = new Color(255, 0, 0);
        const white = red.plus(new Vec3(0, 255, 255));
        const black = red.minus(new Color(255, 0, 0));

- Prints "Test A" two times.

        class TestVec3 extends Vec3 {
            constructor(q, r, s) {
                super(q, r, s);
                console.log("Test A");
            }
        }
        const test0 = new TestVec3(0, 0, 0);
        const test1 = test0.plus(new Vec3(0, 0, 0));

- Prints "Test B" three times.

        class TestVec2 extends Vec2 {
            constructor(x, y) {
                super(x, y);
                console.log("Test B");
            }
        }
        const test0 = new TestVec2(0, 0);
        const test1 = test0.plus(new TestVec2(0, 0, 0));
