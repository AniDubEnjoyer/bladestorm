# MathExtends

Math structs with polymorphic class methods.

If the structs are extended, inherited methods:

- Return an object of the child's TypeScript type.
- Uses the child's constructor to create that object.

If the child overrides the constructor,
the child's constructor arguments must match the parent's.

# Examples

- TypeScript type of b is Vec3.

        const a = new Vec3(0, 0, 0);
        const b = a.plus(new Vec3(0, 0, 0));

- TypeScript type of white and black are both Color.

        class Color extends Vec3 {}
        const red = new Color(255, 0, 0);
        const white = red.plus(new Vec3(0, 255, 255));
        const black = red.minus(new Color(255, 0, 0));

- Will print "Test3" to the console twice.

        class TestVec3 extends Vec3 {
            constructor(q, r, s) {
                super(q, r, s);
                console.log("Test3");
            }
        }
        const test0 = new TestVec3(0, 0, 0);
        const test1 = test0.plus(new Vec3(0, 0, 0));

- Will print "Test2" to the console three times.

        class TestVec2 extends Vec2 {
            constructor(x, y) {
                super(x, y);
                console.log("Test2");
            }
        }
        const test0 = new TestVec2(0, 0);
        const test1 = test0.plus(new TestVec2(0, 0, 0));
