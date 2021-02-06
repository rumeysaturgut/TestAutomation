import { assert } from "chai";
import { methods } from "../helpers/helper";
import { describe } from "mocha";

const feedbackTestCase = () => {
    describe("Feedback Test Case", function() {
        this.timeout(0);
        let element;
        describe("", function() {
            it("should headline change", async function() {
                debugger;
                element = await methods.goToHomepage(element);
                assert(element.innerText, "Anasayfa");
            });
        });
        describe("", function () {
            it("", async function () {
                element = await methods.goToLiveChannel(element);
                assert(element.innerText, "Canlı Yayın");
            })
        });
				await methods.executeDuration(() => {
						element = document.querySelector(".focusable-item.focus");
				}, 1000);
				while(methods.hasInnerText(element, "Sorun bildir") === false) {
						methods.goDown();
						element = document.querySelector(".focusable-item.focus");
				};
				await methods.executeDuration(methods.enter, 1000);
				await methods.executeDuration(() => {
						element = document.querySelector(".problem-report-modal .font-size-1");
				},1000);
				await methods.executeDuration(methods.enter, 1000);
				assert.notEqual(element.innerText, "Canlı yayında sorun mu var?");
			});
};

export { feedbackTestCase };