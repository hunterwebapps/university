using NUnit.Framework;
using University.Business.Auth;

namespace University.Business.Test.Auth
{
    [TestFixture]
    public class PasswordHashShould
    {
        [Test]
        public void GeneratePasswordHashThatMatchesDatabaseFieldSize()
        {
            var hasher = new PasswordHash("testPassword");

            Assert.That(hasher.Hash.Length, Is.EqualTo(36));
            Assert.That(hasher.Salt.Length, Is.EqualTo(36));
        }

        [Test]
        public void ProperlyComparePasswordsWithSalt()
        {
            var password = "testPassword";
            var salt = new byte[] { 42, 187, 188, 239, 229, 164, 8, 198, 70, 110, 188, 75, 223, 213, 5, 88, 91, 114, 82, 207, 216, 144, 203, 239, 146, 234, 28, 37, 30, 32, 134, 37, 61, 92, 163, 249 };
            var hasher = new PasswordHash(password, salt);
            
            var hash = "\u0010o?\u001a???G??\u0006?F>|#g???\a?\r \u0014\u0012??w%$?;2??";

            Assert.That(hasher.Hash, Is.EqualTo(hash));
        }
    }
}
